$(function(){

  function buildHTML(message){
    // var insertImage = '';
    // if (message.image.url) {
    //   insertImage = `<img src="${message.image.url}">`;
    // }
    var html = `<div class="message">
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
  // 自動更新
var interval = setInterval(function() {
  if (location.href.match(/\/groups\/\d+\/messages/)){
    var message_id = $('.main-contents__body__list__message').last().data('id');
    $.ajax({
      url: location.href,
      type: "GET",
      data: {id: message_id},
      dataType: "json"
    })
    .done(function(data) {
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.massages').append(html);
        $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
        $('.new_message .message').val('');
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  } else {
      clearInterval(interval);
    }
} , 5000 );
});
