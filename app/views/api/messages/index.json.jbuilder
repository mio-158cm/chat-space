#messages_controllerの@new_messagesを代入、message.jsのhtmlに入る(新しいメッセージ)
json.array! @new_messages do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.name
  json.id message.id
end