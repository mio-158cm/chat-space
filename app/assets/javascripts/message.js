$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    }
    var html = `<div class="message" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                       ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`
        return html;
    }

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.form__submit').prop('disabled', false);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
    $('.form__message').val('');
})
  .fail(function(){
    alert('error');
  })
})

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id =  $('.message:last').data('id');

    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(message) {
      console.log(message);
      if(message.length !== 0) {
      var insertHTML = '';
      message.forEach(function(message) {
        insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
    })
  }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });

  }
}
  setInterval(reloadMessages, 5000);
  });