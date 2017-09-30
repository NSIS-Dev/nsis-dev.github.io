var debug = true;

var b,
Bookmarks = {

  config: {
    saveButton: $('.save-bookmark'),
    sortButton: $('.sort-bookmark'),
    manageButton: $('.manage-bookmarks'),
    deleteButton: $('.delete-bookmark')
  },


  init: function() {
    b = this.config;
    this.events();
    this.populate()
  },


  // click events
  events: function() {
    b.saveButton.click(function(event) {
      Bookmarks.save();
    });

    b.sortButton.click(function(event) {
      Bookmarks.sort();
    });

    b.manageButton.click(function(event) {
      Bookmarks.manage();
    });

    $('body').on('click', '.delete-bookmark', function (event) {
      Bookmarks.delete($(this));
    });
  },


  // populate menu with bookmarks
  populate: function() {
    var bookmarks = this.getItem();

    if (bookmarks.length > 0) {
        $("#bookmarks-menu").removeClass('hidden');
        var html = "";
        bookmarks.forEach(function(item) {
            if (typeof item !== 'undefined' && item !== null) {
                html += '\n<li><a href="'+item.url+'" rel="bookmark">'+item.name+'</a></li>';
            }
        });

        $('#bookmarks-menu ul .divider').nextAll().remove();
        $('#bookmarks-menu ul').append(html);
    } else {
      $('.bookmark-manager').modal('hide');
      $("#bookmarks-menu").addClass('hidden');
    }
  },


  // launch bookmarks manager
  manage: function() {
    event.preventDefault();

    if (debug) console.log("Launching bookmark manager");

    $('.modal').remove();

    var bookmarks = this.getItem();

    modal = Modal.header('bookmark-manager', 'Bookmark Manager');
    modal += "\n        <div class=\"table-responsive\">";
    modal += "\n          <table class=\"table table-hover table-striped\">";
    modal += "\n            <tbody>";

    bookmarks.forEach(function(item) {
        if (typeof item !== 'undefined') {
            modal += "\n                <tr>";
            modal += '\n                  <td>'+item.name+'<br><a href="'+item.url+'" class="text-muted small bookmark-url">'+item.url+'</a></td>';
            modal += '\n                  <td class="text-right"><button type=button class="btn btn-sm btn-danger delete-bookmark"">Remove</button></td>';
            modal += "\n                </tr>";
        }
    });

    modal += "\n            </tbody>";
    modal += "\n          </table>";
    modal += "\n        </div>";
    modal += Modal.footer('Close');

    $('body').append(modal);
    $('.bookmark-manager').modal('show');
  },


  // sort bookmarks
  sort: function() {
    event.preventDefault();

    var bookmarks = this.getItem();

    if (debug) console.log("Sorting bookmarks");
    bookmarks.sort(byKey('name'));
    this.setItem(bookmarks);
    this.populate();
  },


  // delete bookmark
  delete: function(el) {
    event.preventDefault();


    if (debug) console.log("Delete bookmark");
    var url = el.parent('td').prev('td').children('.bookmark-url').text();
    el.closest('tr').hide();
    var bookmarks = getBookmarks();

    // Remove from localStorage
    if (bookmarks.length > 0) {
        for (var i = bookmarks.length - 1; i >= 0; i--) {
            if (bookmarks[i].url === url) {
                if (debug) console.log("Deleting bookmark");
                bookmarks.splice(i,1);
            }
        }
    }

    this.setItem(bookmarks);
    this.populate();
  },


  // save bookmarks
  save: function() {
    event.preventDefault();

    var bookmarks = this.getItem();

    var name = document.title;
    var suffix = ' | Nullsoft Scriptable Install System';

    var count = name - suffix;

    if (name.endsWith(suffix)) {
        name = name.slice(0, -suffix.length);
    }

    var url = window.location.href;
    var duplicate = false;

    // Duplicate?
    if (bookmarks.length > 0) {
        bookmarks.forEach(function(item) {
            if (item.url === url) {
                duplicate = true;
            }
        });
    }

    // Add bookmark
    if (duplicate === true)  {
        if (debug) console.log("Duplicate link, skipping "+url);
    } else {
        console.log("Saving bookmark "+url);
        bookmarks.push({
            name: name,
            url: url
        });
        this.setItem(bookmarks);
        $('#bookmarks-menu ul').append('\n<li><a href="'+url+'" rel="bookmark">'+name+'</a></li>');
        $("#bookmarks-menu").removeClass('hidden');
    }
  },


  // load bookmarks from localStorage
  getItem: function() {
    var i = [];
    if( localStorage.getItem('bookmarks') !== null ) {
        if (debug) console.log("Loading bookmarks from locationStorage");
        i = JSON.parse(localStorage.getItem('bookmarks'));
    }
    return i;
  },


  // save bookmarks to localStorage
  setItem: function(arr) {
    if (debug) console.log("Saving bookmarks to locationStorage");
    localStorage.setItem('bookmarks', JSON.stringify(arr));
  },


};