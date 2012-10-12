(function()
{
  var VICTIM_HIT_SOUND = new Audio("sfx/two.wav");

  function Victim($selector)
  {
    this.$selector = $selector;
  }

  Victim.prototype =
  {
    punch: function()
    {
      var $face = this.$selector.find('.face');
      $face.attr('src', 'images/two.jpg');
      VICTIM_HIT_SOUND.play();
      setTimeout(function() { $face.attr('src', 'images/one.jpg'); }, 200);
    },

    restore: function()
    {
      this.$selector.find('.face').attr('src', 'one.jpg');
    }
  };

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
          console.log("Unknown message: " + message);
          break;
      }
    });
  });
})();
