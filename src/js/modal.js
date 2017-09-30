var m,
Modal = {

  // config: {
  //   saveButton: $('.save-bookmark'),
  //   sortButton: $('.sort-bookmark'),
  //   manageButton: $('.manage-bookmarks')
  // },


  init: function() {
    // m = this.config;
    this.events();
  },

  // click events
  events: function() {
  },

  header: function(classes, name) {
    var header = "<div class=\""+classes+" modal fade\" tabindex=\"-1\" role=\"dialog\">";
    header += "\n  <div class=\"modal-dialog\">";
    header += "\n    <div class=\"modal-content\">";
    header += "\n      <div class=\"modal-header\">";
    header += "\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    header += "\n        <h4 class=\"modal-title\">"+name+"</h4>";
    header += "\n      </div>";
    header += "\n      <div class=\"modal-body\">";
    return header;
  },

  footer: function(button) {
    var footer = "\n      </div>";
    footer += "\n      <div class=\"modal-footer\">";
    footer += "\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">"+button+"</button>";
    footer += "\n      </div>";
    footer += "\n    </div>";
    footer += "\n  </div>";
    footer += "\n</div>";
    return footer;
  }

};