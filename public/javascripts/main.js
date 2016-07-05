function sendVote () {
  var u = $('input[name="user_name"]').val();
  var v = $('input[name="vote_for"]:checked').val();
  u = $.trim(u);
  if (u == ""){
    alert('pls type your name!');
    return;
  }
  $.post('/vote', {user_name:u,vote_for:v}, function (data){
    if (data.result == "success"){
      window.location.reload();
    }
  });
}
function loadVoteResult () {
  $.get('/users',function (result){
    if (result.length > 0){
      for (var i = result.length - 1; i >= 0; i--) {
        $('#content'+result[i].vote_for).append('<p>'+result[i].username+'</p>');
      };
    }
  });
}
$(document).ready(function (){
  // loadVoteResult();
  $.get('/docs');
});
