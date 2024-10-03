require 'rake'
require 'open-uri'
require 'progress_bar'

namespace :phonebook do
  desc "Concert Database"
  task import: :environment do
    p "Import contacts from HTTP service"
    data = Imports::PhonebookService.call "/api/v1/contacts?from=0&limit=1000"

    return unless data.respond_to?(:any?) && data.any?

    # claer tables
    ActiveRecord::Base.establish_connection(:development)
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE contacts")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE departments")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE titles")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE params")
    ActiveRecord::Base.connection.execute("TRUNCATE TABLE addresses")

    p "Parsing data from JSON and save contacts to database"
    bar = ProgressBar.new(data['contacts'].count)
    data['contacts'].each do |json_string|
      bar.increment!
      create_contact json_string
    end

    User.all.each do |user|
      contacts = Contact.joins(:params).where("params.value = '#{user.email}'")
      user.update({contact: contacts.first}) if contacts.length == 1
    end
  end

  private 
  
  def create_contact data
    # id":1,
    # "slug":"ogonkov-aleksei-valentinovich",
    # "name":"Огоньков Алексей Валентинович",
    # "title":"Глава города Твери",
    # "department":[
    #   {"name":"Администрация города Твери","slug":"administratsiya-goroda-tveri"}
    # ],
    # "photo":"/images/contacts/1/small_%D0%9E%D0%93%D0%9E%D0%9D%D0%AC%D0%9A%D0%9E%D0%92.jpg",
    # "params":{
    #   "email":[
    #     {"type":"Рабочий (приёмная)","value":"gorod@adm.tver.ru","link":"mailto:gorod@adm.tver.ru"}
    #   ],
    #   "phone":[
    #     {"type":"Рабочий","value":"51-01","link":"tel:5101"},
    #     {"type":"Рабочий (приёмная)","value":"52-01","link":"tel:5201"},
    #     {"type":"Конференция","value":"80-01","link":"tel:8001"},
    #     {"type":"Городской","value":"8 (4822) 36-02-31","hint":"Тверь, Тверская область","link":"tel:84822360231"},
    #     {"type":"HiCom","value":"22-00","link":"tel:2200"},
    #     {"type":"HiCom (приёмная)","value":"20-22","link":"tel:2022"}
    #   ]
    # }

    lastname, firstname, middlename = data['name'].split(' ')
    contact = Contact.new({
      lastname: lastname,
      firstname: firstname,
      middlename: middlename
    })

    contact.department = data['department']&.reduce([]) do |deps, dep|
      deps << Department.find_or_create_by({name: dep['name'], parent_id: deps.last&.id})
    end.last

    contact.title = Title.find_or_create_by(name: data['title'])

    data['params']['phone']&.reverse_each do |param|
      contact.params.new({
        name: param['type'],
        value: param['value'],
        param_type: :phone
      })
    end

    data['params']['email']&.reverse_each do |param|
      contact.params.new({
        name: param['type'],
        value: param['value'],
        param_type: :email
      })
    end

    if data['photo'] && data['photo'] !~ /_user.png$/
      begin
        path = data['photo'].gsub(/small_/, 'original_')
        url = URI.parse("https://phonebook.adm.tver.ru#{path}")
        file_name = URI.decode_www_form_component(path.split('original_').last)
        contact.image = URI.open(url)
        contact.image.instance_write(:file_name, file_name)
        # contact.image.attach(io: URI.open(url), filename: file_name)
      rescue OpenURI::HTTPError
        puts "Error: #{url}"
      end
    end
    
    contact.save
  end
end
