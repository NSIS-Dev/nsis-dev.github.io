var p,
Preferences = {

  config: {
    setupButton: $('.setup-page'),
    switchButton: $('.set-highlighter'),
    customTheme: $('.custom-theme'),
  },


  init: function() {
    p = this.config;
    this.events();
  },


  // click events
  events: function() {
    p.setupButton.click(function(event) {
      Preferences.show();
    });

    $('body').on('click', '.set-highlighter', function (event) {
      Preferences.switch();
    });
  },

  // populate menu with bookmarks
  show: function() {
    event.preventDefault();
    this.modal();
  },


  switch: function() {
    if (debug) console.log('Switching theme');

    $('.set-highlighter').removeClass("active");
    p.customTheme.addClass('hidden');
    $(event.target).addClass("active");

    var text = $(event.target).text().toLowerCase();
    // var theme;

    if ((text === "dark") || (text === "light")) {
        $('body').removeClass('hljs-dark hljs-light').addClass('hljs-' + text);
        $('.hljs-theme').attr('href', window.location.host + '/assets/css/highlight.min.css');
        localStorage.setItem('hljs-theme', text);
    }
    if (debug) console.log("Highlighter is set to " + text);
  },


  modal: function() {
    if (debug) console.log('Showing page settings');

    $('.modal').remove();

    var dark   = "";
    var light  = "";
    var custom = " hidden";

    var theme = localStorage.getItem('hljs-theme');

    console.log("Selected theme: " + theme);

    if ( theme === 'dark' ) {
       dark  = " active";
    } else if( theme === 'light' ) {
       light = " active";
    } else {
      custom = " active";
    }

    modal = Modal.header('page-settings', 'Page Settings');
    // modal += "<p>Search engine:&nbsp;</p>";
    // modal += "<div class=\"btn-group\" role=\"group\">";
    // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">DuckDuckGo</button>";
    // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">Bing</button>";
    // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">Google</button>";
    // modal += "</div>";
    modal += "<p>Highlighter theme:</p>";
    modal += "<div class=\"btn-group switch\" role=\"group\">";
    modal += "  <button type=\"button\" class=\"btn btn-switch set-highlighter"+dark+"\">Dark</button>";
    modal += "  <button type=\"button\" class=\"btn btn-switch set-highlighter"+light+"\">Light</button>";
    modal += "  <button type=\"button\" class=\"btn btn-switch custom-theme"+custom+"\">Custom</button>";
    modal += "</div>";
    modal += Modal.footer('Close');

    $('body').append(modal);
    $('.page-settings').modal('show');
  }
};

//   $(function() {

//     $('.setup-page').click(function(event) {

//         event.preventDefault();
//         showSettings();
//     });

//     $('body').on('click', p.switchButton, function (event) {
//         $(p.highlighter).removeClass("active");
//         $('.custom-theme').addClass('hidden');
//         $(this).addClass("active");

//         var text = $(this).text().toLowerCase();
//         var theme;

//         if ((text === "dark") || (text === "light")) {
//             $('body').removeClass('hljs-dark hljs-light').addClass('hljs-' + text);
//             // theme = "assets/css/highlighter.css";
//             $('.hljs-theme').attr('href', 'assets/css/highlighter.css');
//             localStorage.setItem('hljs-theme', text);
//         // } else {
//         //     theme = "assets/css/"+text+".css";
//         //     localStorage.setItem('hljs-theme', theme);
//         }

//         if (debug) console.log("Highlighter is set to " + text);


//         // $('.hljs-theme').attr("href", theme);

//     });

// });