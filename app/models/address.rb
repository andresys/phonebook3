class Address < ApplicationRecord
  has_many :contacts
  has_many :departments

  def self.method_missing(m, *args, &block)
    if (math = /all_(\S+)s/.match(m)) && (math = math[1])
      return select(math).distinct.order(math).collect {|a| a.send(math)} if new.respond_to?(math)
    end
    super
  end

  def to_s
    "#{street}, #{house}, #{room}, #{location}, #{zip}"
  end
end
