require_relative 'boot'
require 'csv'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Phonebook3
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1
    config.version = '3.5'

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    #config.web_console.whitelisted_ips = '172.30.128.18'

    # Load Phone codes of Russia
    config.phone_codes = {}
    CSV.foreach("#{Rails.root}/config/phone_codes.csv", col_sep: ';') do |row|
      row[2] && row[2].split(',').each {|code| config.phone_codes[code.strip.to_s] = [row[0], row[1]]}
    end

    config.time_zone = "Europe/Moscow"
    config.i18n.available_locales = %i[en ru]
    config.i18n.default_locale = :ru

    # config.api_only = false
    # config.middleware.use ActionDispatch::Flash
    config.active_storage.variant_processor = :mini_magick
  end
end
