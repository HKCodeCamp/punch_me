function ComboBar($selector)
{
  this.$selector = $selector;

  this.counter = 0;
  this.score = 0;
  this.refresh();

  this.timeout = null;
  this.interval = null;
}

ComboBar.prototype = {
  hitImpl: function(val)
  {
    this.score += val;
    this.refresh();
  },

  hit: function(val)
  {
    if(typeof(val) == 'undefined')
      val = 1;

    this.hitImpl(val);
    this.counter += 1;

    if(this.interval) clearInterval(this.interval);
    if(this.timeout) clearTimeout(this.timeout);

    var self = this;
    self.timeout = setTimeout(function()
    {
      self.counter = 0;
      if(self.onRestore)
        self.onRestore();

      self.interval = setInterval(function()
      {
        var x = Math.max(0, self.score - 3) - self.score;
        self.hitImpl(x);
      }, 10);
    }, 1000);
  },

  refresh: function()
  {
    this.$selector.find('.progress .bar').css('width', this.score + "%");

    if(this.counter <= 0)
      this.$selector.find('.combo').hide();
    else
    {
      this.$selector.find('.combo').show();
      this.$selector.find('.combo .value').text(this.counter);
    }

    this.$selector.find('.progress')
      .removeClass('progress-info')
      .removeClass('progress-success')
      .removeClass('progress-warning');

    if(this.score < 50)
      this.$selector.find('.progress').addClass('progress-info');
    else if(this.score < 75)
      this.$selector.find('.progress').addClass('progress-success');
    else if(this.score)
      this.$selector.find('.progress').addClass('progress-warning');
  }
};
