require 'rake'
require 'open-uri'
require 'progress_bar'

namespace :phonebook do
  desc "TODO"
  task reindex: :environment do
    puts "Reindex contacts database:"
    ActiveRecord::Base.establish_connection(:production)

    bar = ProgressBar.new(Contact.count)
    p "Clear index data"
    SearchIndex.delete_all

    p "Generate index data and write to database"
    indexes = []
    Contact.all.each do |contact|
      bar.increment!
      SearchIndex.transaction do
        SearchIndex.create(contact.gen_index.map{|val| {value: val, contact_id: contact.id}})
      end
    end
  end
end
