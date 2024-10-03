module FormatHelper
  def format_tag(object, options = {})
    format_type = options.delete(:type)

    self.send("#{format_type}_format_type", object, options) if defined? "#{format_type}_format_type"
  end

  def phone_format_type(object, options = {})
    number =  (object.respond_to?(:value) && object.value || object).gsub(/[^\d+]/, '')
    number_type = object.name[0].upcase + object.name[1..-1] if object.respond_to?(:name)
    number = "84822#{number}" if number.length == 6

    format_number, info_number = case number
    when /^\d{1,6}$/
      format_phone(number)
    when /^(\+7|8)(9\d{9})$/
      russian_mobile_phone("+7#{$2}")
    when /^(\+7|8)(\d{10})$/
      russian_phone($2)
    else
      Phonelib.parse(number).full_international
    end

    return format_number if options.delete(:value)
    number_title = info_number && "#{number_type} (#{info_number.join(', ')})" || number_type
    make_tag format_number, "tel:#{number}", title: number_title || "", type: number_type
  end

  def email_format_type(object, options = {})
    email =  (object.respond_to?(:value) && object.value || object).gsub(/[^0-9a-zA-Z@.-_]/, '')
    email_type = object.name[0].upcase + object.name[1..-1] if object.respond_to?(:name)

    return email if options.delete(:value)
    make_tag email, "mailto:#{email}", title: email_type  || "", type: email_type
  end

private

  def russian_phone(phone_number)
    code = phone_number.chars.inject([]) {|codes, digit| codes << ((codes.last || '') + digit)}.select do |code|
      Rails.application.config.phone_codes[code]
    end.last || phone_number[0..2]
    number = phone_number[code.length..-1]
    ["8 (#{code}) #{format_phone(number)}", Rails.application.config.phone_codes[code] || []]
  end

  def russian_mobile_phone(phone_number)
    Phonelib.parse(phone_number).full_international
  end

  def format_phone(phone_number)
    case phone_number
    when /^(\d{1,3})$/
      "#{$1}"
    when /^(\d{2})(\d{2})$/
      "#{$1}-#{$2}"
    when /^(\d{2,3}?)(\d{1,2})(\d{2})$/
      "#{$1}-#{$2}-#{$3}"
    end
  end

  def make_tag(*args, &block)
    tag.dd class: "flex flex-wrap justify-between mt-1" do
      concat tag.span "#{args[2].delete(:type)}:", class: "mr-2 text-nowrap" if args[2][:type]
      args[2][:class] = (args[2][:class] ? args[2][:class] + ' ' : '') + "text-nowrap ml-auto text-pb-600"
      concat link_to *args, &block
      #concat link_to "", args[block ?0:1], class: "ml-2 far fa-clipboard invisible", 'data-clipboard-text': block && block.call || args[0], title: "Копировать в буфер обмена"
      #concat link_to "", nil, class: "far fa-question-circle ml-2"
      #concat link_to "", nil, class: "fas fa-angle-double-right ml-2"
    end
  end
end