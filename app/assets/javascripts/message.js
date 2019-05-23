$(function(){

  function buildHTML(message){
    // var insertImage = '';
    // if (message.image.url) {
    //   insertImage = `<img src="${message.image.url}">`;
    // }
    var html = `<div class="message"  data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                       ${ message.time }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`;
        return html;
    }
    function scroll() {

      $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  e.stopPropagation();
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
    $('.form__message').val('').reset();;
    $('.form__submit').prop('disabled', false).reset();
    scroll()
})
  .fail(function(){
    alert('error');
    $('.form__submit').prop('disabled', false);
  })
})


$(function(){
  setInterval(update, 5000);
});

function update(){
  var presentMessageId = $('.chat-box').last().attr('id')
  var presentHTML = window.location.href
   if (presentHTML.match(/\/groups\/\d+\/messages/)) {
    // var message_id = $('.main-contents__body__list__message').last().data('id');
     $.ajax ({
      url: presentHTML,
      type: 'GET',
      data: {id: message_id},
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(json){
      var insertHTML = "";
      json.forEach(function(message){
        if (message.id > presentMessageId){
          insertHTML += buildHTML(message);
          $messages = $('.right-mainbody');
          $messages.append(insertHTML);
          $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
        }
      });
    })
     .fail(function(data){
            alert('失敗');
    });
   } else {
    clearInterval(interval)
  }
}
});

