class SearchIndex < ApplicationRecord
  self.table_name = "searches_indexes"

  def self.clear(contact)
    where(contact_id: contact.id).delete_all
  end

  def self.save(contact)
    create(contact.gen_index.map{|val| {value: val, contact_id: contact.id}})
  end
end