$(function() {

  function locationHashChanged() {
    var hash = location.hash;

    switch (hash) {
      case "#forum":
      case "#forums":
      url = "http://forums.winamp.com/forumdisplay.php?forumid=65";
      break;
      case "#wiki":
      url = "http://nsis.sourceforge.net";
      break;

      default:
      return false;
    }

    transformPage();
    injectFrame(url);
  }

  hash = window.location.hash;
  if( hash !== "") {
    locationHashChanged();
  }

  window.onhashchange = locationHashChanged;

});