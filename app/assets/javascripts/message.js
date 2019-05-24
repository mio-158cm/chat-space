$(function(){

  function buildHTML(message){
    var messages = $('tbody').append("");
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
//自動更新
$(function(){
  setInterval(update, 5000);
});

function update(){ //
  if($('.messages')[0]){
  var message_id = $('.messages:last').data('id');
  //一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
} else { //ない場合は
  var message_id = 0 //0を代入
}
  $.ajax({
    url: '/groups/:group_id/messages',
    type: 'GET',
    data: {message: { id: message_id }},
    dataType: 'json'
  })
  .always(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
    $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
      buildMESSAGE(data); //buildMESSAGEを呼び出す
    });
  });
}
});
