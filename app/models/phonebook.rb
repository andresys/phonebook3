require 'yaml'

class Phonebook
  class << self
    def config
      @@config ||= Config.new()
    end

    def help
      @@help ||= Help.new()
    end
  end

private

  class Hashit
    def initialize(hash)
      hash.each do |k,v|
        self.instance_variable_set("@#{k}", v.is_a?(Hash) ? Hashit.new(v) : v)
        self.class.send(:define_method, k, proc{self.instance_variable_get("@#{k}")})
        self.class.send(:define_method, "#{k}=", proc{|v| self.instance_variable_set("@#{k}", v)})
      end
      self.class.send(:define_method, "[]", proc{|k| self.instance_variable_get("@#{k}")})
      self.class.send(:define_method, "[]=", proc{|k,v| self.instance_variable_set("@#{k}", v)})
      self.class.send(:define_method, "method_missing", proc{|k| nil})
    end

    def update(hash)
      hash.each do |k,v|
        if not v.is_a?(Hash)
          self.instance_variable_set("@#{k}", v)
        elsif self.instance_variable_get("@#{k}").blank?
          self.instance_variable_set("@#{k}", Hashit.new(v))
        else
          self.instance_variable_get("@#{k}").send(:update, v)
        end
      end
    end
  end

  class Config < Hashit
    @@config_file = Rails.root.join('config/phonebook.yml')

    def initialize(path_to_config_file = nil)
      @@config_file = path_to_config_file if path_to_config_file
      
      # Default config
      config = {
        default_page: :contacts
      }
      load_config(@@config_file).each { |k,v| config[k.to_sym] = v }
      super(config)
    end

    def update(config)
      super(config.to_h)
      save_config(@@config_file, update_config(config.to_h))
    end

    def update_config(hash)
      config = {}
      hash.each do |k,v|
        config[k.to_sym] = v.is_a?(Hash) ? update_config(v) : v
      end
      config
    end

  private

    def load_config(path_to_config_file)
      yaml = File.open(path_to_config_file, 'r') { |file| file.read }
      begin
        #(YAML::load(IO.read(path_to_config_file)) || {}).deep_symbolize_keys
        (YAML::load(yaml) || {}).deep_symbolize_keys
      rescue Errno::ENOENT
        log(:warning, "YAML configuration file couldn't be found. Using defaults."); return
      rescue Psych::SyntaxError
        log(:warning, "YAML configuration file contains invalid syntax. Using defaults."); return
      end
    end

    def save_config(path_to_config_file, config = {})
      #IO.write(path_to_config_file, YAML::dump(config))
      File.open(path_to_config_file, 'w') { |file| file.write(YAML::dump(config)) }
    end
  end

  class Help < Hashit
    @@help_file = Rails.root.join('help.md')
    attr_accessor :text

    def initialize(path_to_help_file = nil)
      @@help_file = path_to_help_file if path_to_help_file

      @text = load_help(@@help_file)
      md_options = {
        tables: true,
        fenced_code_blocks: true,
        autolink: true,
        strikethrough: true
      }
      @markdown = Redcarpet::Markdown.new(Render.new, md_options)
    end

    def render(text = nil)
      @markdown.render(text || @text).html_safe
    end

    def update(help)
      super(help.to_h)
      save_help(@@help_file, help[:text])
    end

  private

    def load_help(path_to_help_file)
      File.open(path_to_help_file, 'r') { |file| file.read }
    end

    def save_help(path_to_help_file, text = "")
      File.open(path_to_help_file, 'w') { |file| file.write(text) }
    end

    class Render < Redcarpet::Render::HTML
    end
  end
end