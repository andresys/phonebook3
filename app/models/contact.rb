class Contact < ApplicationRecord
  include Settings::ContactSearch
  include Slugged

  def initialize(args = {})
    args ||= {}
    args[:params] = init_params(args[:params]) if args[:params]
    super(args)
  end

  def update(args = {})
    args[:params] = init_params(args[:params]) if args[:params]
    super(args)
  end

  has_attached_file :image,
                    styles: { medium: "250x250#", small: "60x60#" },
                    #default_url: ActionController::Base.helpers.asset_path("user.png"),
                    default_url: "/:style_user.png",
                    path: ":rails_root/public/images/contacts/:id/:style_:filename",
                    url: "/contacts/:id/:style_:filename",
                    processors: [:cropper]
  # has_one_attached :image do |attachable|
  #   attachable.variant :medium, :resize_to_fill => [250,250]
  #   attachable.variant :small, :resize_to_fill => [60,60]
  # end


  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  # validates :image, presence: false, blob: { content_type: ['image/png', 'image/jpg', 'image/jpeg'], size_range: 0..(10.megabytes) }
  validates :lastname, :firstname, presence: true

  attr_accessor :location, :zip, :street, :house, :room
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :delete_image

  belongs_to :department
  belongs_to :title
  belongs_to :address, optional: true
  has_one :user
  has_many :params, as: :paramable
  has_one :chief_of_department, class_name: "Department", foreign_key: :chief_id
  has_and_belongs_to_many :favorites, class_name: "User"

  accepts_nested_attributes_for :params, reject_if: :all_blank, allow_destroy: true

  def slug_candidates
    [
      [:lastname, :firstname, :middlename],
      [:lastname, :firstname, :middlename, :id],
    ]
  end
  
  def name
    "#{lastname} #{firstname} #{middlename}"
  end

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def name_changed?
    lastname_changed? || firstname_changed? || middlename_changed?
  end

  def to_s
    name.strip
  end

  def chief
    department == chief_of_department ? department && department.parent && department.parent.chief : department && department.chief
  end

  def subordinates
    chief_of_department && chief_of_department.contacts.select {|c| c.id != id}
  end

private

  before_save do |c|
    if self.location && self.zip && self.street && self.house && self.room
      ap = { location: self.location, zip: self.zip, street: self.street, house: self.house, room: self.room }
      a = Address.find_or_initialize_by(ap)
      if a.new_record? && self.address && self.address.contacts.count + self.address.departments.count == 1
        self.address.update(ap)
      else
        a.save
        self.address = a
      end
    end
  end

  # after_save do |c|
  #   SearchIndex.transaction do
  #     c.reindex
  #   end
  # end

  after_initialize do |c|
    unless c.new_record?
      c.location = c.address && c.address.location
      c.zip = c.address && c.address.zip
      c.street = c.address && c.address.street
      c.house = c.address && c.address.house
      c.room = c.address && c.address.room
    end
  end

  def init_params(params)
    if params #&& params.is_a? Param
      ret = []
      params.each do |param|
        prm = Param.find_or_initialize_by(id: param[:id]) {|prm| prm.id = nil}
        prm.name, prm.value, prm.param_type = param[:name], param[:value], param[:type]
        prm.save unless prm.new_record?
        ret << prm unless (prm.name.blank? || prm.value.blank? || prm.param_type.blank?)
        prm.delete if prm.value.blank?
      end
    end
    ret || params
  end
end