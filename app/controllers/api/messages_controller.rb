class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @new_messages = @messages.where('id > ?', params[:id])}
    end
  end
end