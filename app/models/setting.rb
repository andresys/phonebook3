# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  scope :general do
    field :title, default: "Телефонный справочник [версия 3.5]", type: :string
    field :default_per_page, default: 20, type: :integer
  end
end
