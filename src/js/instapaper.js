var i,
Instapaper = {

  config: {
    shareButton: $('.to-instapaper')
  },


  init: function() {
    i = this.config;
    this.apply()
  },


  // click events
  events: function() {
    i.shareButton.click(function(event) {
      Instapaper.save();
    });
  },


  save: function() {
    event.preventDefault();
    if (debug) console.log("Saving to Instapaper");
    var name = encodeURIComponent(document.title);
    var url = window.location.href;
    window.open("http://www.instapaper.com/hello2?url="+url+"&title="+name);
  }

}