$(function() {

  var searchItems;

  if(typeof searchBody === 'undefined'){
    var searchBody = "../../data/documentation.json";
  }

  if (use_storage()) {

    now = time();
    then = localStorage.getItem(searchBody+':age');

    if ((now - then) >= 86400000) {

      // load JSON file
      console.log("load JSON file");

      $.ajax(searchBody, {
        dataType: "json",
        success: function(contents) {
          searchItems = contents;

          // save to localStorage
          if (use_storage()) {
            localStorage.setItem(searchBody+':body', JSON.stringify(contents));
            localStorage.setItem(searchBody+':age', time());
          }
        }

      }).done(function() {

            // show modal
            $("#search-input").keydown(function () {

              form = $('#search-form');

              searchText = $("#search-input").val();

              // Collapse dropdown
              $('.ui-autocomplete').css({display: 'none'});

              if( inArrayS(searchText, searchItems) > -1 ) {
                // in searchBody
                form.attr('action', 'javascript:docsPage()');
              } else {
                form.attr('action', 'javascript:duckDuckGo()');
              }
            });

            $( "#search-input" ).hint({
              delay: 0,
              source: searchItems
            });
            $('.ui-autocomplete').css({padding: '0'});
        });
    } else {

      // load localStorage
      console.log("load localStorage data");

      searchItems = JSON.parse(localStorage.getItem(searchBody+':body'));
    }
  }
});