$(function() {

  var searchItems;
  var searchText;

  if(typeof searchBody === 'undefined') {
    var searchBody = $('body').data('search');
  }

$.ajax(searchBody, {
  dataType: "json",
  success: function(contents) {
    searchItems = contents;
  }
}).done(function() {

      localStorage.setItem('search-index', searchItems);

      // Search parameters?
      if (typeof $.urlParam('s') !== 'undefined') {
        searchText = $.urlParam('s');
        injectFrame("https://duckduckgo.com/?sites=nsis.sourceforge.net&ka=h&k7=%23f5f4f3&kj=%236f6171&ky=%23ffffff&kx=b&kt=Segoe+UI&q="+searchText);
      }

      // Display “Search” and focus
      $("#search-input").attr('placeholder', 'Search').removeAttr('disabled').focus();

      // On search
      $("#search-input").keydown(function () {

        var form = $('#search-form');
        searchText = $("#search-input").val();

        // set focus on item
        $("#search-input>ul>li.ui-state-focus").removeClass("ui-state-focus");
        $('.ui-menu-item').filter(function() { return $.text([this]) === searchText; }).addClass("ui-state-focus");

        if( inArrayS(searchText, searchItems) > -1 ) {
          // redirect to documentation
          form.attr('action', 'javascript:docsPage()');
        } else {
          // search web
          form.attr('action', 'javascript:duckDuckGo()');
        }
      });

      // Prevent empty submission
      $("#search-form").submit(function(e){

        // e.preventDefault();

        if ($.trim( $("#search-input").val() ) === "") {
          return false;
        }
      });

      // Hint search results
      $( "#search-input" ).hint({
        delay: 0,
        source: searchItems
      });

      $('.ui-autocomplete').css({padding: '0'});
  });
});