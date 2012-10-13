(function()
{
  var VICTIM_HIT_SOUND = new Audio("sfx/two.wav");

  function Victim($selector)
  {
    this.$selector = $selector;
    $selector.jrumble();
    $('#particles-overlay')
      .css('left', $selector.position().left + "px")
      .css('top', $selector.position().top + "px");
  }

  Victim.prototype =
  {
    punch: function()
    {
      // $face.attr('src', 'images/two.jpg');
      this.shakeAndVibrate(this.$selector);

      var x = Math.random() * $('canvas')[0].width;
      var y = Math.random() * $('canvas')[0].height;

      window.explodeAt(x, y);
      window.paperExplodeAt(x, y);

      VICTIM_HIT_SOUND.play();
      // setTimeout(function() { $face.attr('src', 'images/one.jpg'); }, 200);
    },

    heal: function()
    {
      window.paperReset();
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
    var victim = new Victim($('#main-canvas'));
    var faye = new Faye.Client("http://localhost:9292/faye");

    var comboBar = new ComboBar($('.score'));

    $('button.punch').on('click', function()
    {
      victim.punch();
      comboBar.hit(5);
    });

    $('button.heal').on('click', function()
    {
      victim.heal();
    });

    faye.subscribe('/punch_me', function(message)
    {
      var command = message.split(' ')[0];
      switch(command)
      {
        case 'PUNCH':
          victim.punch();
          break;

        default:
          console.log("Unknown message: " + message);
          break;
      }
    });
  });
})();
