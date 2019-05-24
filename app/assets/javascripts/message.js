$(function(){

  function buildHTML(message){
    // var insertImage = '';
    // if (message.image.url) {
    //   insertImage = `<img src="${message.image.url}">`;
    // }
    var html = `<div class="message" id="${message.id}">
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
    // alert('error');
    $('.form__submit').prop('disabled', false);
  })
})

// ここから下が自動更新
$(function(){
  setInterval(update, 5000);
});

function update(){
  // setIntervalで5秒ごとに更新
   var presentMessageId = $('.message').last().attr('id')
   // console.log(presentMessageId)
   // 最新のメッセージからidを取得
  var presentHTML = window.location.href
  // console.log(presentHTML)
  // 現在のURLを表示

  // メッセージ画面以外だと反応しないようにする
   if (presentHTML.match(/\/groups\/\d+\/messages/)) {
    console.log(presentHTML)
  // 現在のURLからIDを取得
     $.ajax ({
      url: presentHTML,
      type: 'GET',
      data: {id: presentMessageId},
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(json){
      // insertHTMLを空欄として定義する
      var insertHTML = "";



      json.forEach(function(message){
        if (message.id > presentMessageId){
      // insertHTMLにbuildHTMLを加える（messageの中身は変数）また、buildHTMLは非同期のつぶやき内容
          insertHTML += buildHTML(message);
          // cosole.log(insertHTML)
      // 右側のright-mainbodyに非同期のつぶやきであるbuildHTMLを入れていく作業
          $messages = $('.messages');
          $messages.append(insertHTML);
          $messages.animate({scrollTop: $messages[0].scrollHeight}, 'fast');
          // alert("success")
        }
      });
    })
     .fail(function(data){
      // alert('失敗');
      // alert('error')
    });
   } else {
    clearInterval(interval)
  }
}
});
