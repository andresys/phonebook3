module URI
  def self.escape(url)
    encode_www_form_component(url)
  end
end