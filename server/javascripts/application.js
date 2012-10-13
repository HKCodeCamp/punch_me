(function()
{
  var VICTIM_HIT_SOUND = new Audio("sfx/two.wav");

  function Victim($selector)
  {
    this.$selector = $selector;
    var $face = this.$selector.find('.face');
    $face.jrumble();
    $('#particles-overlay')
      .css('left', $face.position().left + "px")
      .css('top', $face.position().top + "px");
  }

  Victim.prototype =
  {
    punch: function()
    {
      var $face = this.$selector.find('.face');
      // $face.attr('src', 'images/two.jpg');
      this.shakeAndVibrate($face);
      window.explodeAt(Math.random() * 400, Math.random() * 600);
      VICTIM_HIT_SOUND.play();
      // setTimeout(function() { $face.attr('src', 'images/one.jpg'); }, 200);
    },

    // restore: function()
    // {
    //   this.$selector.find('.face').attr('src', 'one.jpg');
    // },

    shakeAndVibrate: function(target) {
      var animationTimeout;
      clearTimeout(animationTimeout);
      target.trigger('startRumble');
      animationTimeout = setTimeout(function(){target.trigger('stopRumble');}, 1000);
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
      var command = message.split(' ')[0];
      switch(command)
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
