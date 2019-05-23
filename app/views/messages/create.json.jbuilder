json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name    @message.user.name
json.content    @message.content
# json.time    @message.created_at
json.id    @message.id