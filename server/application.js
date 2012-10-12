$(function()
{
  var faye = new Faye.Client("http://localhost:9292/faye");
  faye.subscribe('/punch_me', function(message)
  {
    $('.trace').append(message + "<br />");
  });
});
