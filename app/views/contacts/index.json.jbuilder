#json.array! @contacts, partial: "contact", as: :contact
#json.contacts @contacts.map{ |contact| contact.id }
#json.departments @contacts.map{ |contact| contact.department_id }.uniq
json.query @query || ''
json.contact do
  contact = Contact.find(@cid)
  json.id contact.id
  json.name contact.to_s
  #json.lastname contact.lastname
  #json.firstname contact.firstname
  #json.middlename contact.middlename
  json.title contact.title.to_s
  json.department contact.department.self_and_ancestors.map(&:to_s)
  json.chief contact.chief if contact.chief
  json.photo contact.image.url(:medium, timestamp: false)
  json.favorite current_user.has_favorite?(contact) if current_user
  json.params additional_params({phone: contact.params.select{|p| p['param_type'] == 'phone'}.map{|p| {type: p['name'], value: p['value']}}, email: contact.params.select{|p| p['param_type'] == 'email'}.map{|p| {type: p['name'], value: p['value']}}})
end if @cid
json.contacts @cids if @cids
json.departments @dids if @dids
  #json.extract! contact, :id #, :lastname, :firstname, :middlename
  #json.name contact.to_s
  #json.department contact.department_id
  #json.url contact_url(contact, format: :json)
#end