class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable,
         :lockable, :timeoutable, :trackable

  belongs_to :contact, optional: true
  has_and_belongs_to_many :favorites, class_name: "Contact"

  attr_accessor :rolify, :rolify_access

  after_create :confirm, if: Proc.new { User.count == 1 }
  after_create :assign_default_role_and_contact

  def rolify
    has_role?(:admin) && :admin || has_role?(:manager) && :manager || :user
  end

  def rolify=(role)
    roles.each { |r| remove_role r.name.to_sym }
    add_role role.to_sym
  end

  def assign_default_role_and_contact
    add_role(User.count == 1 ? :admin : :user) if roles.blank?

    contacts = Contact.joins(:params).where("params.name LIKE 'email_%' and params.value = ?", email)
    update(contact: contacts.first) if contacts.count == 1
  end

  def has_favorite?(contact)
    favorites.include?(contact)
  end
end
