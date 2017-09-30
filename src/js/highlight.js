var h,
Highlight = {

  config: {
    // style: window.location.host + 'assets/css/highlight.min.css',
    custom: null,
    code: $('pre code'),
    theme: $('.hljs-theme'),
    body: $('body')
  },


  init: function() {
    h = this.config;
    this.default()
    this.apply()
  },


  default: function() {
    if (!localStorage.getItem('hljs-theme')) {
       var theme = "dark";
       localStorage.setItem('hljs-theme', theme);
    }
  },


  apply: function() {
    // var h.default = 'assets/css/highlighter.css';
    h.custom   = localStorage.getItem('hljs-theme') || "dark"

    if ((h.custom === "dark") || (h.custom === "light")) {
       if (debug) console.log('Default ' + h.custom + ' theme');
       h.body.removeClass('hljs-dark hljs-light').addClass('hljs-' + h.custom);
       // h.theme.attr('href', h.style);
     } else {
       if (debug) console.log('Custom theme from ' + h.custom)
       h.theme.attr('href', h.custom);
     }

     h.code.each(function(i, block) {
       hljs.highlightBlock(block);
     });
  }

};