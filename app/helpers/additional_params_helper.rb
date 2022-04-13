module AdditionalParamsHelper
  def additional_params(params = {})
    params.inject({}) do |params, (type, vals)|
      if vals.is_a? Array
        vals.map! { |val| val.merge(self.respond_to?("#{type}_additional_params", true) ? self.send("#{type}_additional_params", val.transform_keys(&:to_s)).transform_keys(&:to_s) : {}).compact }
        params.merge(Hash[type.to_s, vals])
      else
        val = vals.attributes.transform_keys(&:to_s)
        val.merge(self.respond_to?("#{type}_additional_params", true) ? self.send("#{type}_additional_params", val.transform_keys(&:to_s)).transform_keys(&:to_s) : {}).compact
      end
    end
  end

private

  def phone_additional_params(val)
    number =  val["value"] && val["value"].gsub(/[^\d+]/, '')
    number_type = val["type"] && (val["type"][0].upcase + val["type"][1..-1])
    number = "84822#{number}" if (number.length == 6) && (number[0].to_i > 1)

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

    { 
      "value": format_number,
      "type": number_type,
      "hint": info_number && info_number.join(', '),
      "link": "tel://#{number}"
    }
  end

  def email_additional_params(val)
    email =  val["value"] && val["value"].gsub(/[^0-9a-zA-Z@.-_]/, '')
    email_type = val["type"] && (val["type"][0].upcase + val["type"][1..-1])

    {
      "type": email_type,
      "link": "mailto://#{email}"
    }
  end

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

end