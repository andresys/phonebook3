contact = @contact
json.id contact.id
json.name contact.to_s
#json.lastname contact.lastname
#json.firstname contact.firstname
#json.middlename contact.middlename
json.title contact.title.to_s
json.department do
  json.id contact.department.id
  json.name contact.department.to_s
end
#json.chief contact.chief
json.photo contact.image.url(:small, timestamp: false)
# json.favorite JSON.parse(contact.favorite || "[]").include?(current_user.id) if current_user
json.params additional_params({phone: contact.params.select{|p| p['param_type'] == 'phone'}.map{|p| {type: p['name'], value: p['value']}}, email: contact.params.select{|p| p['param_type'] == 'email'}.map{|p| {type: p['name'], value: p['value']}}})