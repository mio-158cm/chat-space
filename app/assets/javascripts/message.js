$(function(){
  function buildHTML(message){
    // var insertImage = '';
    // if (message.image.url) {
    //   insertImage = `<img src="${message.image.url}">`;
    // }
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
//非同期通信
$('#new_message').on('submit', function(e){
  e.preventDefault();
  // e.stopPropagation();
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

//自動更新

  var reloadMessages = function() {
    // ↓メッセージ画面以外だと反応しないようにする
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    //設定した_message.html.hamlのカスタムデータ属性{"data-id": "#{message.id}"}を利用し、ブラウザに表示されている最新メッセージのidを取得
    //$('.message:last')のmessageは単数になる
    var last_message_id =  $('.message:last').data('id');

    $.ajax({
      //ルーティングで設定した通りのURLを指定。api以前は省略可能
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(message) {
      console.log(message);
      //messagesの中に何か入った時発火
      if(message.length !== 0) {
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる、insertHTMLは仮に入れるもの、messagesにするとエラーだった
      message.forEach(function(message) {
        insertHTML = buildHTML(message);
      //メッセージが入ったHTMLを取得
      $('.messages').append(insertHTML);
      //スクロール
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      //メッセージを追加
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