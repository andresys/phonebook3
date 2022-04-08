module DatatableHelper
  def datatable_tag(object, options = {})
    namespace = object.kind_of?(Array) && object[0..-2]
    object = object.kind_of?(Array) && object[-1] || object
    options = default_options(options)

    columns = options.delete(:columns)
    checked = options.delete(:checked)
    search = options.delete(:search)
    default = options.delete(:default)
    active = options.delete(:active)
    actions = options.delete(:actions)
    selected = options.delete(:selected)
    panel_actions = options.delete(:panel_actions)
    html_options = options.delete(:html_options)

    datatable = DataTableClass.new
    # Checked
    datatable.column raw('<input type="checkbox">'), style: 'width: 50px', translate: false do |row|
      check_box_tag "%s[]" % ActiveModel::Naming.singular(row), row.id, false, id: nil
    end if checked
    # Default
    datatable.column :default, style: 'width: 150px; text-align: center' do |row|
      radio_button_tag "%s[default]" % ActiveModel::Naming.singular(row), row.id, row.default
    end if default
    # Active|Inactive
    datatable.column :active, style: 'width: 100px; text-align: center' do |row|
      material_switch_tag "%s[active][]" % ActiveModel::Naming.singular(row), row.id, row.active, class: "bg-primary"
    end if active
    # Databese cols
    columns.each do |col|
      if col.is_a? Symbol
        col_name = col.to_s
      elsif col.kind_of? Hash
        col_name = col.delete(:name)
        col_value = col.delete(:value)
        col_options = col
      end
      datatable.column(col_name || "", col_options || {}) {|row| eval('row.%s' % (col_value || col_name)).to_s}
    end
    yield(datatable) if block_given?
    # Row actions
    datatable.column :actions, style: 'width: 50px; text-align: right' do |row|
      raw init_actions(row, actions, [], namespace).join(" | ")
    end if actions

    content_tag :div, class: "datatable" do
      header(object, panel_actions, search, namespace)
      table(object, datatable, checked, namespace)
      footer(object, panel_actions, false, namespace)
    end
  end

private

  def default_options(options)
    {
      search: true,
      checked: true,
      default: false,
      active: false,
      actions: [:edit, :delete],
      panel_actions: [:new, :delete],
      selected: true
    }.merge(options)
  end

  def init_actions(object, actions, init_html_class=[], namespace = nil)
    actions.map do |action|
      action, options = action.keys[0], action.values[0] if action.is_a? Hash and action.length == 1
      action, options = [:group, action] if action.kind_of? Array
      options = {}.merge(options || {}) unless options.kind_of? Array
      model_name = [namespace, ActiveModel::Naming.singular(object)].compact.join('_')
      title = options.delete(:title)
      icon = options.delete(:icon)
      html_class = (options.delete(:html_class) || [] + init_html_class).compact
      link = options.delete(:link)
      target = options.delete(:target)
      js = options.delete(:js)
      disabled = options.delete(:disabled)
      disabled = true if disabled.nil? && object.respond_to?(:each) && js.nil?
      action_tag = lambda do
        target = case target.nil? && true || target
        when true
          "$this.trigger(\"datatable_#{model_name}_#{action}\");"
        when false
          ""
        else
          "$this.trigger(\"#{target}\");"
        end
        js = javascript_tag <<-script
          $this = $(document.currentScript.parentNode);
          $this.click(function() {
            $this = $(this);
            #{target}
            #{js}
          });
          script
        if link
          link_to link, remote: false, data: {action: action}, title: t(title || action, scope: :datatable), class: html_class, **options do
            concat content_tag :i, nil, class: "#{icon}" if icon
            concat " " if icon && title
            concat content_tag :span, t(title, scope: :datatable), class: (icon ? "d-none d-xl-inline" : "") if title
            concat t(action, scope: :datatable) unless title || icon
            concat js
          end
        else
          button_tag data: {action: action, disabled: disabled}, title: t(title || action, scope: :datatable), class: html_class, disabled: disabled, **options do
            concat content_tag :i, nil, class: "#{icon}" if icon
            concat " " if icon && title
            concat content_tag :span, t(title, scope: :datatable), class: (icon ? "d-none d-xl-inline" : "") if title
            concat t(action, scope: :datatable) unless title || icon
            concat js
          end
        end
      end
      link = link.call(object) if link.is_a? Proc
      target ||= false unless object.respond_to?(:each)
      case action
      when :new
        icon = "fas fa-file"
        title ||= ("new_%s" % model_name).to_sym
        html_class += %w[btn-primary]
        link ||= eval("new_#{model_name}_path")
        action_tag.call
      when :edit
        icon = "fas fa-edit"
        link ||= eval("edit_#{model_name}_path(object)")
        action_tag.call
      when :print
        icon = "fas fa-print"
        html_class += %w[btn-light]
        action_tag.call
      when :move
        icon = "fas fa-share-square"
        html_class += %w[btn-light]
        action_tag.call
      when :import
        icon = "fas fa-download"
        html_class += %w[btn-light]
        action_tag.call
      when :export
        icon = "fas fa-upload"
        html_class += %w[btn-light]
        action_tag.call
      when :delete
        if object.respond_to?(:each)
          icon = "fas fa-trash-alt"
          title ||= :delete
          html_class += %w[btn-light]
        else
          icon = "fas fa-trash-alt"
          link ||= eval("#{model_name}_path(object)")
          data = options.delete(:data) || {}
          data.merge!({ 
            'confirm': strip_tags(t('dialog.destroy_body')),
            'confirm-fade': true,
            'confirm-title': strip_tags(t('dialog.destroy_title')),
            'confirm-cancel': strip_tags(t('dialog.cancel')),
            'confirm-cancel-class': "btn-cancel",
            'confirm-proceed': strip_tags(t('dialog.destroy')),
            'confirm-proceed-class': "btn-danger" })
          options.merge!({ method: 'delete', data: data})
        end
        action_tag.call
      when :group
        content_tag :div, data: {action: action}, class: "btn-group mr-sm-2 mr-1", role: "group" do raw init_actions(object, options, %w[btn btn-light btn-sm], namespace).join(" ") end
      else
        if object.respond_to?(:each)
          html_class += %w[btn-light]
        end
        action_tag.call
      end
    end
  end

  def header(object, panel_actions, search = true, namespace = nil)
    model_name = [namespace, ActiveModel::Naming.singular(object)].compact.join('_')
    concat (content_tag :nav, class: "navbar position-sticky navbar-light header-panel d-flex", style: "background-color: #e3f2fd;" do
      concat (content_tag :div, class: "d-flex my-1 mr-4" do
        concat raw init_actions(object, panel_actions, %w[btn btn-sm mr-sm-2 mr-1], namespace).join(" ")
        concat javascript_tag <<-script
          $(document).on("datatable_#{model_name}_checked", function(e){
            ids = [];
            $(e.target).closest('table').find('tbody td:first-child input:checked').closest('tr').each(function(){
              ids.push($(this).attr('data-id'));
            });
            var btn = $(e.target).closest('div.datatable').find('nav.header-panel>div button[data-disabled=true]');
            if(ids.length > 0) { btn.removeAttr('disabled') } else { btn.prop('disabled', 'true') };
          });
        script
      end)
      if search
        concat (content_tag :div, class: "d-flex my-1" do
          concat text_field_tag nil, nil, class: "form-control form-control-sm mr-sm-2 mr-1", type: "search", placeholder: t(:search, scope: :datatable), aria: {label: t(:search)}
          concat button_tag t(:search, scope: :datatable), class: "btn btn-outline-primary btn-sm d-none d-md-flex"
        end)
      end
    end)
  end

  def table(object, datatable, checked = true, namespace = nil)
    model_name = [namespace, ActiveModel::Naming.singular(object)].compact.join('_')
    concat (content_tag :div, class: "table-responsive" do
      content_tag :table, class: "table table-hover" do
        concat (content_tag :thead do
          content_tag :tr do
            datatable.cols.each do |col|
              options = {translate: true}.merge(col[:options] || {})
              translate = options.delete(:translate)
              concat (content_tag :th, options do
                translate ? t(col[:name].to_sym, scope: :datatable) : col[:name].to_s
              end)
            end
          end
        end)
        concat (content_tag :tbody do
          (object.kind_of?(Array) && object[-1] || object).each do |row|
            concat (content_tag :tr, data: {id: row.id} do
              datatable.cols.each do |col|
                options = {translate: true}.merge(col[:options] || {})
                translate = options.delete(:translate)
                concat (content_tag :td, options do
                  col[:block].call(row) if col[:block]
                end)
              end
            end)
          end
        end)
        if checked
          concat javascript_tag <<-script
            var table = $(document.currentScript.parentNode);
            var checkboxes = $(table).find('tbody td:first-child input');
            var chckbx_all = $(table).find('thead th:first-child input');
            checkboxes.click(function() {
              $(this).trigger("datatable_#{model_name}_checked");
              var count = $(table).find('tbody td:first-child input:checked').length;
              chckbx_all.prop('checked', count > 0);
              chckbx_all.prop('indeterminate', count > 0 && count < checkboxes.length);
            });
            chckbx_all.click(function() {
              checkboxes.prop('checked', this.checked);
              $(this).trigger("datatable_#{model_name}_checked");
            });
          script
        end
      end
    end)
  end

  def footer(object, panel_actions, search = true, namespace = nil)
    model_name = [namespace, ActiveModel::Naming.singular(object)].compact.join('_')
    concat (content_tag :nav, class: "navbar position-sticky navbar-light footer-panel d-flex", style: "background-color: #e3f2fd;" do
      concat (content_tag :div, class: "d-flex my-1 mr-4" do
        concat raw init_actions(object, panel_actions, %w[btn btn-sm mr-sm-2 mr-1], namespace).join(" ")
        concat javascript_tag <<-script
          $(document).on("datatable_#{model_name}_checked", function(e){
            ids = [];
            $(e.target).closest('table').find('tbody td:first-child input:checked').closest('tr').each(function(){
              ids.push($(this).attr('data-id'));
            });
            var btn = $(e.target).closest('div.datatable').find('nav.footer-panel>div button[data-disabled=true]');
            if(ids.length > 0) { btn.removeAttr('disabled') } else { btn.prop('disabled', 'true') };
          });
        script
      end)
      if search
        concat (content_tag :div, class: "d-flex my-1" do
          concat text_field_tag nil, nil, class: "form-control form-control-sm mr-sm-2 mr-1", type: "search", placeholder: t(:search, scope: :datatable), aria: {label: t(:search)}
          concat button_tag t(:search, scope: :datatable), class: "btn btn-outline-primary btn-sm d-none d-md-flex"
        end)
      end
    end)
  end

  class DataTableClass
    attr_reader :cols

    def initialize()
      @cols = []
    end

    def column(name, options = {})
      @cols << { name: name, options: options, block: lambda {|row| yield(row) } }
    end
  end
end