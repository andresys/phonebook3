module IconHelper
  def bs_icon icon, size = nil, options = {}
    file_name = "node_modules/bootstrap-icons/icons/#{icon}.svg"
    svg_icon(file_name, size && options.merge(width: size.to_s, height: size.to_s) || options) if File.exists?(file_name)
  end

  def fa_icon icon, options = {}
    css_class = options.delete(:class)
    tag.i nil, class: ["fa fa-#{icon}", css_class].join(' ')
  end

  def svg_icon file_name, options = {}
    file = File.read(file_name)
    doc = Nokogiri::HTML::DocumentFragment.parse file
    svg = doc.at_css 'svg'
    options.each { |k,v| svg[k] = v }
    raw doc.to_html
  end
end