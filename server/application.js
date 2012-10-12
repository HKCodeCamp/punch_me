(function()
{
  function Victim($selector)
  {
    this.$selector = $selector;
  }

  Victim.prototype =
  {
    punch: function()
    {
      var $face = this.$selector.find('.face');
      $face.attr('src', 'two.jpg');
      setTimeout(function() { $face.attr('src', 'one.jpg'); }, 200);
    },

    restore: function()
    {
      this.$selector.find('.face').attr('src', 'one.jpg');
    }
  };


  function logTrace(x)
  {
    $('.trace').append(x + "<br />");
  }

  $(function()
  {
    var victim1 = new Victim($('.victim'));
    var faye = new Faye.Client("http://localhost:9292/faye");

    $('button.punch').on('click', function()
    {
      victim1.punch();
    });

    faye.subscribe('/punch_me', function(message)
    {
      switch(message)
      {
        case 'PUNCH':
          victim1.punch();
          break;

        default:
          logTrace("Unknown message: " + message);
          break;
      }
    });
  });
})();
