require 'rake'
require 'open-uri'
require 'progress_bar'

namespace :db do
  desc "TODO"
  task convert: :environment do
    puts "Convert database phonebook2 to phonebook3:"

    # claer tables
    ActiveRecord::Base.establish_connection(:development)
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE addresses")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE contacts")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE contacts_users")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE departments")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE params")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE titles")
    
    ActiveRecord::Base.establish_connection(:phonebook2)
    count = ActiveRecord::Base.connection.execute("select count(*) as count from contacts as c 
                                                left join departments as d1 on c.department_id = d1.id 
                                                left JOIN departments as d2 on d1.parent_id = d2.id 
                                                LEFT JOIN departments as d3 ON d2.parent_id = d3.id 
                                                left JOIN departments as d4 ON d3.parent_id = d4.id 
                                                left JOIN titles as t ON c.title_id = t.id").first[0]
    bar = ProgressBar.new(count)
    res = ActiveRecord::Base.connection.execute("select 
                                                c.lastname, c.firstname, c.middlename,
                                                d1.name as department1, d2.name as department2, d3.name as department3, d4.name as department4,
                                                t.name as title, t.position as position,
                                                c.email, c.phone_ext, c.phone_int, c.phone_hicom,
                                                c.zip, c.location, c.street, c.house, c.room,
                                                c.id, c.image_file_name
                                                from contacts as c 
                                                left join departments as d1 on c.department_id = d1.id 
                                                left JOIN departments as d2 on d1.parent_id = d2.id 
                                                LEFT JOIN departments as d3 ON d2.parent_id = d3.id 
                                                left JOIN departments as d4 ON d3.parent_id = d4.id 
                                                left JOIN titles as t ON c.title_id = t.id
                                                ORDER BY d4.lft ASC, d3.lft ASC, d2.lft ASC, d1.lft ASC, t.position ASC, c.lastname ASC, c.firstname ASC, c.middlename ASC")
    ActiveRecord::Base.establish_connection(:development)
    fields = res.fields.map{|f| f.to_sym}
    res.each do |row|
      bar.increment!
      c = Hash[*[fields, row.map{|v| v && v.to_s.chomp(' UTC') || nil}].transpose.flatten]

      deps = [c[:department4], c[:department3], c[:department2], c[:department1]].compact
      
      next if (deps.count <= 0) || (c[:title] || '').empty?

      dep_id = deps.reduce([]) do |deps, d|
        deps << Department.find_or_create_by({name: d, parent_id: deps.last && deps.last.id})
      end.last.id

      tit_id = (Title.find_or_create_by(name: c[:title]) do |t|
        t.position = c[:position]
      end).id

      params = []
      if c[:phone_int]
        c[:phone_int].split(/[ .,;]/).each do |param|
          n = "Рабочий"
          n = "Рабочий (приёмная)" if param =~ /^п/i
          n = "Рабочий (факс)" if param =~ /факс/i
          n = "Рабочий (факс)" if param =~ /ф\./i
          n = "Рабочий (конференция)" if param =~ /конф/i
          params << {name: n, value: param.gsub(/[^0-9]/, ''), type: :phone}
        end
      end
      if c[:phone_ext]
        c[:phone_ext].split(/[ .,;]/).each do |param|
          n = "Городской"
          n = "Городской (приёмная)" if param =~ /^п/i
          n = "Городской (факс)" if param =~ /факс/i
          n = "Городской (факс)" if param =~ /ф\./i
          params << {name: n, value: param.gsub(/[^0-9]/, ''), type: :phone}
        end
      end
      if c[:phone_hicom]
        c[:phone_hicom].split(/[ .,;]/).each do |param|
          n = "HiCom"
          n = "HiCom (приёмная)" if param =~ /^п/i
          n = "HiCom (факс)" if param =~ /факс/i
          params << {name: n, value: param.gsub(/[^0-9]/, ''), type: :phone}
        end
      end
      if c[:email]
        c[:email].split(/[ ,;]/).each do |param|
          n = "Рабочий"
          n = "Рабочий (приёмная)" if param =~ /^pri/i
          params << {name: n, value: param, type: :email}
        end
      end

      Contact.transaction do
        contact = Contact.create({lastname: c[:lastname], firstname: c[:firstname], middlename: c[:middlename],
                        department_id: dep_id,
                        title_id: tit_id,
                        location: c[:location], zip: c[:zip], street: c[:street], house: c[:house], room: c[:room],
                        params: params})

        if c[:image_file_name]
          begin
            url = URI.parse(URI.escape("https://phonebook.adm.tver.ru/images/contacts/#{c[:id]}/original_#{c[:image_file_name]}"))
            contact.image = open(url)
            contact.image.instance_write(:file_name, c[:image_file_name])
            contact.save
          rescue OpenURI::HTTPError
            puts "Error: https://phonebook.adm.tver.ru/images/contacts/#{c[:id]}/original_#{c[:image_file_name]}"
          end
        end
      end

      User.all.each do |user|
        contacts = Contact.joins(:params).where("params.value = '#{user.email}'")
        user.update({contact: contacts.first}) if contacts.length == 1
      end
    end
  end
end
