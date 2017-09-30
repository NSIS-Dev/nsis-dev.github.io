WebFontConfig = {
  g: { families: [ 'Fira+Sans:400,300,500:latin', 'Fira+Mono::latin' ] }
};
(function() {
  var a = document.createElement('script');
  a.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  a.type = 'text/javascript';
  a.async = 'true';
  var z = document.getElementsByTagName('script')[0];
  z.parentNode.insertBefore(a, z);
})();