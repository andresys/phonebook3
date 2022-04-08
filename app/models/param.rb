class Param < ApplicationRecord
  belongs_to :paramable, polymorphic: true

  def self.all_phone_types(default_types = [])
    (default_types + where(param_type: :phone).distinct.order(:name).collect {|p| p.name}).uniq
  end

  def self.all_email_types(default_types = [])
    (default_types + where(param_type: :email).distinct.order(:name).collect {|p| p.name}).uniq
  end
end
