// Load localStorage
var use_storage = function() {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

// var urlParam = function(name){
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     return results[1] || 0;
// };

var time = Date.now || function() {
  return +new Date();
};

// Open in Command Reference
function docsPage() {
  collapseDropdown();  
  window.location.href = 'https://github.com/NSIS-Dev/Documentation/tree/master/Reference/'+searchText+'.md';
}

// search DuckDuckGo
function duckDuckGo(searchText) {
  collapseDropdown();
  searchText = $("#search-input").val();
  $("#content").replaceWith("<div id=\"content\" class=\"container-fluid web-search\"><div class=\"container\"><iframe width=\"100%\" height=\""+ ($("html").height() - $("navbar").height()) +"\" frameBorder=\"0\" scrolling=\"no\" style=\"position:fixed;top:60px\" src=\"https://duckduckgo.com/?sites=nsis.sourceforge.net&ka=h&k7=%23f5f4f3&kj=%236f6171&ky=%23ffffff&kx=b&kt=Segoe+UI&q="+searchText+"\"></iframe></div></div>");
}

function collapseDropdown() {
  $('.ui-autocomplete').css({display: 'none'});
    searchText = $("#search-input").val();
}

// Case sensitive inArray
function inArrayS(needle, haystackArray){
    var defaultResult = -1;
    var result = defaultResult;
    $.each(haystackArray, function(index, value) { 
        if (result == defaultResult && value.label.toLowerCase() == needle.toLowerCase()) {
            result = index;
        }
    });
    return result;
}

$.widget( "custom.hint", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
});