json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
end

# json.array! @messages do |message|
#   json.id message.id
#   json.text message.text
#   json.image message.image.url
#   json.user_name message.user.name
#   json.created_at message.created_at.to_s(:default)
# end