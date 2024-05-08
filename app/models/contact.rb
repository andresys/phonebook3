class Contact < ApplicationRecord
  def initialize(args = {})
    args ||= {}
    args[:params] = init_params(args[:params]) if args[:params]
    super(args)
  end

  def update(args = {})
    args[:params] = init_params(args[:params]) if args[:params]
    super(args)
  end

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  has_attached_file :image,
                    styles: { medium: "250x250#", small: "60x60#" },
                    #default_url: ActionController::Base.helpers.asset_path("user.png"),
                    default_url: "/:style_user.png",
                    path: ":rails_root/public/images/contacts/:id/:style_:filename",
                    url: "/contacts/:id/:style_:filename",
                    processors: [:cropper]


  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates :lastname,:firstname, presence: true

  attr_accessor :location, :zip, :street, :house, :room
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :delete_image

  belongs_to :department
  belongs_to :title
  belongs_to :address, optional: true
  has_one :user
  has_many :params, as: :paramable
  has_one :chief_of_department, class_name: "Department", foreign_key: :chief_id
  has_and_belongs_to_many :favorites, class_name: "User"

  def name
    "#{lastname} #{firstname} #{middlename}"
  end

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def slug_candidates
    [
      [:lastname, :firstname, :middlename],
    ]
  end

  def name_changed?
    lastname_changed? || firstname_changed? || middlename_changed?
  end

  def to_s
    "#{lastname} #{firstname} #{middlename}".strip
  end

  def chief
    department == chief_of_department ? department && department.parent && department.parent.chief : department && department.chief
  end

  def subordinates
    chief_of_department && chief_of_department.contacts.select {|c| c.id != id}
  end

  def self.search(query, ids = nil)
    return [ids || []] if query.blank?
    res = query.gsub(/[+(]*([0-9]+)[-+() ]*/, '\1').gsub(/([0-9a-zA-Z]+)[-]*/, '\1').gsub(/[^а-яА-Я0-9a-zA-Z+.@]+/, " ").downcase.split(' ').map do |val|
      # p val = val.gsub(/[^а-яА-Я0-9a-zA-Z+.@]+/, '')
      if ids.blank?
        res1 = SearchIndex.where(value: val).pluck(:contact_id)
        res2 = SearchIndex.where("value LIKE ?", "#{val}%").pluck(:contact_id) if res1.blank? || val.length <= 3
        res3 = SearchIndex.where("value LIKE ?", "%#{val}%").pluck(:contact_id) if val.length >= 3
      else
        res1 = SearchIndex.where(value: val, contact_id: ids).pluck(:contact_id)
        res2 = SearchIndex.where("value LIKE ? and contact_id in (?)", "#{val}%", ids).pluck(:contact_id) if res1.blank? || val.length <= 3
        res3 = SearchIndex.where("value LIKE ? and contact_id in (?)", "%#{val}%", ids).pluck(:contact_id) if val.length >= 3
      end
      (res1 || []) + (res2 || []) + (res3 || [])
    end || []
    res = (res.inject{|m,v| m & v} || []).uniq.map{|v| [v, res.flatten.count(v)]}
    res = res.sort_by(&:last).group_by(&:last).values.map{|v| v.map(&:first)}.reverse
  end

  def reindex
    SearchIndex.clear(self)
    SearchIndex.save(self)
  end

  def gen_index
    indexes = "#{firstname} #{lastname} #{middlename}".gsub(/([^а-яА-Яa-zA-Z\-]+)/, " ").split(' ')
    indexes += [slug.gsub(/[^0-9a-zA-Z]/, '')]
    indexes += "#{title && title.name}".gsub(/([^а-яА-Яa-zA-Z\-]+)/, " ").split(' ').select{|val| val.length > 2}
    indexes += "#{location} #{zip} #{street}".gsub(/([^a-zA-Zа-яА-Я0-9\-\\\/]+)/, " ").split(' ')
    indexes += [house && house.gsub(/([^a-zA-Zа-яА-Я0-9\\\/])/, ''), room && room.gsub(/([^a-zA-Zа-яА-Я0-9\\\/])/, '')]
    indexes += params.map{|prm| {phone: prm.value.gsub(/([^+,0-9])/, ''), email: prm.value.gsub(/([^a-zA-Z0-9+\-.@])/, '')}[prm.param_type.to_sym]}
    departments = department && department.self_and_ancestors.map{|dep| !dep.name.blank? && dep.name.gsub(/[^а-яА-Я0-9a-zA-Z]+/, " ").split(' ')}
    indexes += departments.flatten if departments
    indexes += departments.map do |d|
      deps1 = d.select{|val| val != val.upcase}.map{|val| val[0]}.join
      deps2 = d.select{|val| val != val.upcase && val.length > 2}.map{|val| val[0]}.join
      [deps1, deps2].select{|val| val.length > 1}
    end.flatten if departments
    departments = department && department.self_and_ancestors.map{|dep| !dep.slug.blank? && dep.slug.gsub(/[^0-9a-zA-Z]/, '').split(' ')}
    indexes += departments.flatten if departments
    indexes.compact.map{|val| val.downcase}.uniq
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

  after_save do |c|
    SearchIndex.transaction do
      c.reindex
    end
  end

  # after_initialize do |c|
  #   unless c.new_record?
  #     c.location = c.address && c.address.location
  #     c.zip = c.address && c.address.zip
  #     c.street = c.address && c.address.street
  #     c.house = c.address && c.address.house
  #     c.room = c.address && c.address.room
  #   end
  # end

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