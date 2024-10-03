class Department < ApplicationRecord
  include Settings::DepartmentSearch
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

  resourcify
  
  acts_as_nested_set

  attr_accessor :location, :zip, :street, :house, :room

  has_many :contacts #, :include => :title, :order => ['titles.position', 'lastname']
  has_many :params, as: :paramable
  belongs_to :chief, class_name: "Contact", optional: true
  belongs_to :address, optional: true

  accepts_nested_attributes_for :params, reject_if: :all_blank, allow_destroy: true

  def slug_candidates
    [
      # [parent && parent.self_and_ancestors.map{|dep| dep.name}, :name],
      [:name],
      [:name, :id]
    ]
  end

  def abbrs
    abbrs = []
    departments = self_and_ancestors.map{|dep| !dep.name.blank? && dep.name.gsub(/[^а-яА-Я0-9a-zA-Z]+/, " ").split(' ')}
    # abbrs += departments.flatten if departments
    abbrs += departments.map do |d|
      deps1 = d.select{|val| val != val.upcase}.map{|val| val[0]}.join
      deps2 = d.select{|val| val != val.upcase && val.length > 2}.map{|val| val[0]}.join
      [deps1, deps2].select{|val| val.length > 1}
    end.flatten if departments
    abbrs
  end

  def to_s
    name
  end

  default_scope { order(lft: :asc) }

private

  before_save do |d|
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

  after_save do |d|
    #SearchIndex.transaction do
    #  Contact.where(department_id: d.self_and_descendants.map(&:id)).map(&:reindex)
    #end
  end

  after_initialize do |d|
    unless d.new_record?
      d.location = d.address && d.address.location
      d.zip = d.address && d.address.zip
      d.street = d.address && d.address.street
      d.house = d.address && d.address.house
      d.room = d.address && d.address.room
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
