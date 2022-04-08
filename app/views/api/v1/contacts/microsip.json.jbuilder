json.refresh 0
json.items @contacts do |contact|
  phones = JSON.parse(contact.json_params)['phone'] || []
  emails = JSON.parse(contact.json_params)['email'] || []
  json.number phones.select{|p| p['type'] == 'Рабочий'}.map{|p| p['value']}.first
  json.name contact.to_s
  json.firstname contact.firstname
  json.lastname contact.lastname
  json.phone phones.select{|p| p['type'] == 'Рабочий'}.map{|p| p['value']}.first
  json.mobile phones.select{|p| p['type'] == 'Городской'}.map{|p| p['value']}.first
  json.email emails.select{|p| p['type'] == 'Рабочий'}.map{|p| p['value']}.first
  json.address ''
  json.city ''
  json.state ''
  json.zip ''
  json.comment ''
  json.presence 0
  json.info ''
end