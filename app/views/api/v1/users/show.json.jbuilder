if current_user
  json.id current_user.id
  json.name current_user.contact&.to_s || current_user.email
  json.title current_user.contact&.title&.to_s
  json.department current_user.contact&.department&.to_s
  json.photo current_user.contact&.image&.url(:small, timestamp: false)
end