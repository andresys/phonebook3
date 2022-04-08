class Title < ApplicationRecord
  acts_as_list

  has_many :contacts

  default_scope { order('position ASC') }

  def to_s
    name
  end

private

  before_save do |t|
    t.name.strip!
  end
end
