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

  has_many :contacts #, :include => :title, :order => ['titles.position', 'lastname']
  has_many :params, as: :paramable
  belongs_to :chief, class_name: "Contact", optional: true

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
