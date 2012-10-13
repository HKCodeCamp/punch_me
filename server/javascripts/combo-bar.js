function ComboBar($selector)
{
  this.$selector = $selector;
  this.value = 0;
  this.refresh();

  this.timeout = null;
  this.interval = null;
}

ComboBar.prototype = {
  hitImpl: function(val)
  {
    this.value += val;
    this.refresh();
  },

  hit: function(val)
  {
    if(typeof(val) == 'undefined')
      val = 1;

    this.hitImpl(val);

    if(this.interval) clearInterval(this.interval);
    if(this.timeout) clearTimeout(this.timeout);

    var self = this;
    self.timeout = setTimeout(function()
    {
      self.interval = setInterval(function()
      {
        var x = Math.max(0, self.value - 3) - self.value;
        self.hitImpl(x);
      }, 10);
    }, 1000);
  },

  refresh: function()
  {
    this.$selector.find('.progress .bar').css('width', this.value + "%");
    this.$selector.find('.value').text(this.value);

    this.$selector.find('.progress')
      .removeClass('progress-info')
      .removeClass('progress-success')
      .removeClass('progress-warning');

    if(this.value < 50)
      this.$selector.addClass('progress-info');
    else if(this.value < 75)
      this.$selector.addClass('progress-success');
    else if(this.value)
      this.$selector.addClass('progress-warning');
  }
};
