json.contact do
  json.id @contact.id
  json.slug @contact.slug
  json.name @contact.to_s
  json.title @contact.title.to_s
  json.department @contact.department.self_and_ancestors.map{|dep| {name: dep.to_s, slug: dep.slug}}
  json.chief @contact.chief if @contact.chief
  json.photo @contact.image.url(:medium, timestamp: false)
  json.favorite current_user.has_favorite?(@contact) if current_user
  json.params additional_params({phone: @contact.params.select{|p| p['param_type'] == 'phone'}.map{|p| {type: p['name'], value: p['value']}}, email: @contact.params.select{|p| p['param_type'] == 'email'}.map{|p| {type: p['name'], value: p['value']}}})
end if @contact
json.contacts @contacts do |contact|
  json.id contact.id
  json.slug contact.slug
  json.name contact.name
  #json.lastname contact.lastname
  #json.firstname contact.firstname
  #json.middlename contact.middlename
  json.title contact.title_name
  #json.department do
  #  json.id contact.department_id
  #  json.name contact.department_name
  #end
  json.department contact.department.self_and_ancestors.map{|dep| {name: dep.to_s, slug: dep.slug}}
  #json.chief contact.chief
  json.photo contact.image.url(:small, timestamp: false)
  json.favorite JSON.parse(contact.favorite || "[]").include?(current_user.id) if current_user
  json.params additional_params(JSON.parse(contact.json_params))
end