class Api::MessagesController < ApplicationController
  before_action :set_group

  # 選択されているグループのメッセージ
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    # その中でも新しいメッセージを@new_messageと定義、index.json.jbuilderで@new_messageの定義へ
    respond_to do |format|
      format.json { @new_messages = @group.messages.where('id > ?', params[:id]) }
    end
  end

# 選択されているfroup_idを探す
  def set_group
    @group = Group.find(params[:group_id])
  end
end