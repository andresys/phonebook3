class Export < ApplicationRecord
  belongs_to :user, optional: true
  has_one_attached :file, dependent: :delete_all
end
