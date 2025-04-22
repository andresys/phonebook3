module Imports
  class HttpService < ::ApplicationService
    include HTTParty

    def self.config_file filename
      config = YAML.load_file(File.join('config', "#{filename}.yml"))[Rails.env]
      return unless config

      base_uri config.delete('base_uri')
      basic_auth config.delete('username'), config.delete('password')
      headers 'Content-Type' => 'application/json'
      default_options[:options] = config.symbolize_keys
      # headers 'X-Requested-With' => 'XMLHttpRequest'
    end

    def initialize(path, options = {})
      @path = path
      @options = self.class.default_options[:options].merge(options)
    end

    def call
      response = self.class.get(@path, @options)
      response.code == 200 ? response : raise("Error data loading. Response code #{response.code}.")
    end
  end
end