var debug = true;

// var initApp = function() {
//   if (!localStorage.getItem('hljs-theme')) {
//      var theme = "dark";
//      localStorage.setItem('hljs-theme', theme);
//   }
// };
// initApp();

$.urlParam = function(name){
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results) return results[1] || 0;
};

// Load localStorage
var useStorage = function() {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

var time = Date.now || function() {
  return +new Date();
};

// sort on key values
// function byKey(key, desc) {
//   return function(a,b){
//    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
//   };
// }

// Open in Command Reference
function docsPage() {
  transformPage();
  searchText = $("#search-input").val();
  window.location.href = '/Documentation/Reference/'+searchText+'.html';
  // saveSearch(searchText);
}

// search DuckDuckGo
function duckDuckGo() {
  transformPage();
  searchText = $("#search-input").val();
  injectFrame(searchText);
  // saveSearch(searchText);
}

// load bookmarks from localStorage
var getBookmarks = function() {
    var i = [];
    if( localStorage.getItem('bookmarks') !== null ) {
        if (debug) console.log("Loading bookmarks from locationStorage");
        i = JSON.parse(localStorage.getItem('bookmarks'));
    }
    return i;
};

// // save bookmarks to localStorage
// var setBootmarks = function(arr) {
//     if (debug) console.log("Saving bookmarks to locationStorage");
//     localStorage.setItem('bookmarks', JSON.stringify(arr));
// };

// // populate bookmarks menu
// var initBookmarks = function() {

//     var bookmarks = getBookmarks();

//     if (bookmarks.length > 0) {
//         $("#bookmarks-menu").removeClass('hidden');
//         var html = "";
//         bookmarks.forEach(function(item) {
//             if (typeof item !== 'undefined' && item !== null) {
//                 html += '\n<li><a href="'+item.url+'" rel="bookmark">'+item.name+'</a></li>';
//             }
//         });

//         $('#bookmarks-menu ul .divider').nextAll().remove();
//         $('#bookmarks-menu ul').append(html);
//     } else {
//       $('.bookmark-manager').modal('hide');
//       $("#bookmarks-menu").addClass('hidden');
//     }
// };

// var getModalHeader = function(classes, name) {
//   var header = "<div class=\""+classes+" modal fade\" tabindex=\"-1\" role=\"dialog\">";
//   header += "\n  <div class=\"modal-dialog\">";
//   header += "\n    <div class=\"modal-content\">";
//   header += "\n      <div class=\"modal-header\">";
//   header += "\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
//   header += "\n        <h4 class=\"modal-title\">"+name+"</h4>";
//   header += "\n      </div>";
//   header += "\n      <div class=\"modal-body\">";
//   return header;
// };

// var getModalFooter = function(button) {
//   var footer = "\n      </div>";
//   footer += "\n      <div class=\"modal-footer\">";
//   footer += "\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"+button+"</button>";
//   footer += "\n      </div>";
//   footer += "\n    </div>";
//   footer += "\n  </div>";
//   footer += "\n</div>";
//   return footer;
// };

// var showSettings = function() {
//   if (debug) console.log('Showing page settings');

//   $('.modal').remove();

//   var dark   = "";
//   var light  = "";
//   var custom = " hidden";

//   if ( localStorage.getItem('hljs-theme') === 'dark' ) {
//      dark  = " active";
//   } else if( localStorage.getItem('hljs-theme') === 'light' ) {
//      light = " active";
//   } else {
//     custom = " active";
//   }

//   modal = getModalHeader('page-settings', 'Page Settings');
//   // modal += "<p>Search engine:&nbsp;</p>";
//   // modal += "<div class=\"btn-group\" role=\"group\">";
//   // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">DuckDuckGo</button>";
//   // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">Bing</button>";
//   // modal += "  <button type=\"button\" class=\"btn btn-default set-search\">Google</button>";
//   // modal += "</div>";
//   modal += "<p>Highlighter theme:&nbsp;</p>";
//   modal += "<div class=\"btn-group switch\" role=\"group\">";
//   modal += "  <button type=\"button\" class=\"btn btn-switch set-highlighter"+dark+"\">Dark</button>";
//   modal += "  <button type=\"button\" class=\"btn btn-switch set-highlighter"+light+"\">Light</button>";
//   modal += "  <button type=\"button\" class=\"btn btn-switch custom-theme"+custom+"\">Custom</button>";
//   modal += "</div>";
//   modal += getModalFooter('Close');

//   $('body').append(modal);
//   $('.page-settings').modal('show');
// };

// body = $('.navbar>div:not(.container-fluid)').children();
function injectFrame(src) {
  // $('.navbar>div').replaceWith(body);
  $("#content").replaceWith("<div id=\"content\" style=\"position:absolute\"><iframe width=\"100%\" height=\"100%\" frameBorder=\"0\" src=\"https://duckduckgo.com/?sites=nsis.sourceforge.net&ka=h&k7=%23f5f4f3&kj=%236f6171&ky=%23ffffff&kx=b&kt=Segoe+UI&q="+src+"\"></iframe></div>");
}

function transformPage() {
  // collapse main dropdown
  $('.ui-autocomplete').css({display: 'none'});

  // collapse mobile menu
  $('#nsis-navbar-collapse').removeClass('in');

  // remove outer scrollbar
  $('body').css({overflow: 'hidden'});
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

// Search hinting
$.widget( "custom.hint", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this;
      var currentCategory = "";

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