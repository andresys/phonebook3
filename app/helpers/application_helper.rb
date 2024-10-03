module ApplicationHelper
  include Pagy::Frontend
  
  def full_title(page_title)
    base_title = Setting.title
    page_title.present? ? "#{page_title} | #{base_title}" : base_title
  end

  def page_title title, back_url = nil, &block
    tag.div class: "sticky top-[-2rem] tall:top-12 pt-6 bg-white z-20" do
      tag.div class: "flex flex-col sm:block my-4 items-between" do
        icon = bs_icon 'chevron-left', '1.2em'
        concat tag.div class: "order-2 float-end flex gap-2 flex-wrap", &block
        concat (tag.div class: "order-1 flex items-center flex-nowrap mb-2 sm:mb-0" do
          concat link_to icon, back_url, class: "btn mr-2", role: "button" if back_url
          concat tag.h1 title, class: "text-3xl font-normal truncate"
        end)
      end
    end
  end

  def react_component(name, props = {})
    content_tag(:div, { id: name, data: { react_props: props } }) do
    end
  end

  def ext_phone(phones)
    #phones.select{ |phone| phone['type'][/^рабочий|^конференция/i] }
    phones.select{ |phone| phone['type'][/^рабочий/i] }
  end

  def int_phone(phones)
    phones.select{ |phone| phone['type'][/^городской/i] }
  end

  def hicom_phone(phones)
    phones.select{ |phone| phone['type'][/^hicom/i] }
  end

  def department_full deps, prev
    return unless block_given?
    deps = department_title deps, prev
    deps.map { |dep| yield(dep) }
  end

  private

  def department_title deps, prev
    deps.each_with_index do |dep, i|
      return deps[i..] unless prev[i] == dep.id
    end
    []
  end
end