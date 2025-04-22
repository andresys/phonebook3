module NestedHelper
  @@list_type = :ul
  @@list_css_class = nil
  @@item_css_class = nil
  @@item_options = {}

  def nested_list(data, options = {}, &block)
    data = data.order(:lft) if data.is_a? Class

    return '' if data.size == 0

    @@list_type = options.delete(:type) || @@list_type
    @@list_css_class = options.delete(:list_class)
    @@item_css_class = options.delete(:item_class)
    @@item_options = options.delete(:item_options) || @@item_options

    output = [list_container(options)]
    path = [nil]

    data.each_with_index do |item, i|
      unless item.parent_id == path.last
        if path.include?(item.parent_id)
          output << list_container(close: true)
          while path.last != item.parent_id
            path.pop
            output << list_item(item, close: true, **@@item_options)
            output << list_container(close: true)
          end
        else
          path << item.parent_id
        end
      else
        output << list_container(close: true) unless i == 0
        output << list_item(item, close: true, **@@item_options) unless i == 0
      end
      output << list_item(item, id: item.id, **@@item_options)
      output << capture(item, path.size - 1, &block)
      output << list_container
    end
    output << list_container(close: true)

    path.length.times do
      output << list_item(nil, close: true, **@@item_options)
      output << list_container(close: true)
    end
    output.map(&:to_s).join.html_safe
  end

  private

  def list_container(options = {})
    close = options.delete(:close) || false
    options = html_attrs({class: @@list_css_class}.merge(options))
    close ? "</#{@@list_type.to_s}>" : "<#{@@list_type.to_s} #{options}>"
  end

  def list_item item = nil, options = {}
    close = options.delete(:close) || false
    options = html_attrs(item, {class: @@item_css_class}.merge(options))
    close ? "</li>" : "<li #{options}>"
  end

  def html_attrs item = nil, options
    options.filter { |k,v| !v.blank? }.map { |k,v| "#{k}=\"#{v.respond_to?(:call) && item ? v.call(item) : v}\"" }.join(' ')
  end
end