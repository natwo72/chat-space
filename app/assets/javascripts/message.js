$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main__chat__messages">
         <div class="main__chat__messages__massege">
           <div class="main__chat___messages__massege__name">
             ${message.user_name}
           </div>
           <div class="main__chat__messages__massege__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="main__chat__messages__text">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
     `<div class="main__chat__messages">
     <div class="main__chat__messages__massege">
       <div class="main__chat___messages__massege__name">
         ${message.user_name}
       </div>
       <div class="main__chat__messages__massege__date">
         ${message.created_at}
       </div>
     </div>
     <div class="lower-message">
       <p class="main__chat__messages__text">
         ${message.content}
       </p>
     </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
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
    $('.main__chat').append(html);
    $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    $('form')[0].reset();  
  })

  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

  .always(function() {
    $('.submit-btn').prop('disabled',false);   
  });
});
});