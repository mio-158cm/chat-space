$(function(){
$('#new_message').on('submit', function(e){
  e.preventDefault();
  // e.stopPropagation();
  console.log(this)
  var formData = new FormData(this);
  // var url = $(this).attr('action');
  })
})


//   $.ajax({
//     url: url,
//     type: "POST",
//     data: formData,
//     dataType: 'json',
//     processData: false,
//     contentType: false
//   })
//   .done(function(data){
//     var html = buildHTML(data);
//     $('.main-contents__body__list').append(html);
//     $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
//     $('.new_message .message').val('');
//   })
//   .fail(function(){
//     alert('error');
//   })
// })