var k,
Keyboard = {

  config: {
    input:  $("#search-input")
  },

  init: function() {
    m = this.config;
    this.events();
  },

  // Keyboard events
  events: function() {
    $(document).bind('keyup', function(event) {
      Keyboard.focus();
    });
  },

  
  focus: function() {
    if (event.which === 70) {
        if (debug) console.log('Focusing search');
        $("#search-input").focus();
        // $(document).scrollTop(0);
    }
  }

};