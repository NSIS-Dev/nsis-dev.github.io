$(function() {
  
  $('.to-instapaper').click(function(event) {

        event.preventDefault();

        if (debug) console.log("Saving to Instapaper");

        var name = encodeURIComponent(document.title);
        var url = window.location.href;

        window.open("http://www.instapaper.com/hello2?url="+url+"&title="+name);
  });

});