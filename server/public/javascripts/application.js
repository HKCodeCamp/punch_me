MESSAGES = ["Shit", "F Off", "No, I didn't do it", "You Lie !!"];

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
    punch: function(direction, force)
    {
      // $face.attr('src', 'images/two.jpg');
      this.shakeAndVibrate(this.$selector);

      var x = Math.random() * $('canvas')[0].width * 0.85;
      var y = Math.random() * $('canvas')[0].height * 0.85;

      if(x < $('canvas')[0].width * 0.15)
        x = $('canvas')[0].width * 0.15;

      if(y < $('canvas')[0].height * 0.15)
        y = $('canvas')[0].height * 0.15;

      window.particlesExplodeAt(x, y, direction, force);
      window.paperExplodeAt(x, y, direction, force);

      VICTIM_HIT_SOUND.play();
      this.swap_character_message();
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
    },

    swap_character_message: function() {
      $('character-message').html(MESSAGES[Math.random() * MESSAGES.length]);
    }
  };

  function randomDirection()
  {
    var directions = ['UP', 'LEFT', 'RIGHT', 'DOWN'];
    var direction = directions[parseInt(Math.random() * 10, 10) % 4];
    return direction;
  }

  $(function()
  {
    var victim = new Victim($('#main-canvas'));
    var faye = new Faye.Client("http://localhost:9292/faye");

    var comboBar = new ComboBar($('.score'));
    comboBar.onRestore = function()
    {
      victim.heal();
    };

    $('button.punch').on('click', function()
    {
      var force = Math.random() * 10;

      victim.punch(randomDirection(), force);
      comboBar.hit(5);
    });

    faye.subscribe('/punch_me', function(message)
    {
      console.log("Got message: ", message);

      var parts = message.split(' ');
      var command = parts[0];

      switch(command)
      {
        case 'PUNCH':
          var direction = parts[1];
          var magnitude = parts[2];

          if(direction != "UP" && direction != "DOWN" &&
            direction != "LEFT" && direction != "DOWN")
            direction = randomDirection();

          if(typeof(magnitude) != 'number')
            magnitude = Math.random() * 10;

          victim.punch(direction, magnitude);
          comboBar.hit(5);
          break;

        case 'IMAGE':
          window.location = '/?image=' + parts[1];
          break;

        default:
          console.log("Unknown message: ", message);
          break;
      }
    });
  });
})();
