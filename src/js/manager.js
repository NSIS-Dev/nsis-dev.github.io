// $(function() {

//     $('.manage-bookmarks').click(function(event) {

//         event.preventDefault();

//         if (debug) console.log("Launching bookmark manager");

//         $('.modal').remove();

//         var bookmarks = getBookmarks();

//         modal = getModalHeader('bookmark-manager', 'Bookmark Manager');
//         modal += "\n        <div class=\"table-responsive\">";
//         modal += "\n          <table class=\"table table-hover table-striped\">";
//         modal += "\n            <tbody>";

//         bookmarks.forEach(function(item) {
//             if (typeof item !== 'undefined') {
//                 modal += "\n                <tr>";
//                 modal += '\n                  <td>'+item.name+'<br><a href="'+item.url+'" class="text-muted small bookmark-url">'+item.url+'</a></td>';
//                 modal += '\n                  <td class="text-right"><button type=button class="btn btn-sm btn-danger delete-bookmark"">Remove</button></td>';
//                 modal += "\n                </tr>";
//             }
//         });

//         modal += "\n            </tbody>";
//         modal += "\n          </table>";
//         modal += "\n        </div>";
//         modal += getModalFooter('Close');

//         $('body').append(modal);
//         $('.bookmark-manager').modal('show');
//     });

//     $('body').on('click', '.delete-bookmark', function (event) {

//         event.preventDefault();
//         var $this = $(this);
//         var url = $this.parent('td').prev('td').children('.bookmark-url').text();
//         $this.closest('tr').hide();
//         var bookmarks = getBookmarks();

//         // Remove from localStorage
//         if (bookmarks.length > 0) {
//             for (var i = bookmarks.length - 1; i >= 0; i--) {
//                 if (bookmarks[i].url === url) {
//                     if (debug) console.log("Deleting bookmark");
//                     bookmarks.splice(i,1);
//                 }
//             }
//         }

//         setBootmarks(bookmarks);
//         initBookmarks();
//     });
// });