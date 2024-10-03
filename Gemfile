source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.4'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.1.3.2'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.4.4', '< 0.6.0'
# Use Puma as the app server
gem 'puma', '~> 6.4.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 5.2.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'

gem 'sprockets-rails'
gem "jsbundling-rails", "~> 1.3"
gem "cssbundling-rails", "~> 1.4"

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

gem 'turbo-rails', '~> 2.0.5'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-rails'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '~> 3.3.0'
  gem 'listen', '~> 3.3'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring'
  gem 'progress_bar'
  gem "letter_opener", "~> 1.8"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '~> 4.10.0'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

group :production do
  gem 'unicorn'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'slim'

gem 'paperclip', '~> 6.1.0'
gem 'friendly_id', '~> 5.5.0'
gem "devise", "~> 4.9.3"
gem "rails-i18n", "~> 7.0"
gem "babosa", "~> 2.0"

gem 'awesome_nested_set'
gem 'acts_as_list'

gem "pundit", "~> 2.3"
gem "rolify", "~> 6.0"

gem 'phonelib'
gem 'csv'
gem "redcarpet"
gem "csv_builder"
gem "rqrcode"
gem "vcardigan"
gem "vpim"
gem "rack-cors"

gem "rails-settings-cached", "~> 2.9"
gem "stimulus-rails", "~> 1.3"
gem "pagy", "~> 8.2"

gem "searchkick"
gem "elasticsearch"

gem "rubyzip", "~> 2.3"
gem "caxlsx", "~> 4.1"
gem "caxlsx_rails", "~> 0.6.4"

gem "sidekiq", "~> 7.3"

gem "after_commit_everywhere", "~> 1.4"

gem "httparty", "~> 0.22.0"

gem "activestorage-validator", "~> 0.4.0"
