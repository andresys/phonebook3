# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :default_locale, default: "en", type: :string
  # field :confirmable_enable, default: "0", type: :boolean
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true
  scope :general do
    field :title, default: "Телефонный справочник [версия 3.5]", type: :string
    field :host, type: :string, default: "http://localhost:3000"
    field :default_per_page, default: 20, type: :integer
  end

  scope :smtp do
    field :mailer_sender, type: :string
    field :address, type: :string
    field :port, type: :integer, default: 587
    field :user_name, type: :string
    field :password, type: :string
    field :authentication, type: :string, default: 'plain'
    field :enable_starttls, type: :boolean, default: true
  end

  scope :asterisk do
    field :enable_asterisk, type: :boolean, default: false
    field :asterisk_server, type: :string
    field :asterisk_user, type: :string
    field :asterisk_password, type: :string
    field :asterisk_number_type, type: :string
  end
end
