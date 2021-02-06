// ==UserScript==
//
// @name         Darkmode User
// @version      1.0
// @namespace    https://github.com/Purfview/Darkmode-User
// @description  Darkmode for the websites.
// @icon         https://i.imgur.com/ZftAaI6.png
// @license      MIT
//
// @updateURL    https://greasyfork.org/scripts/421332-darkmode-user/code/Darkmode%20User.meta.js
// @downloadURL  https://greasyfork.org/scripts/421332-darkmode-user/code/Darkmode%20User.user.js
//
// @require      https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js
//
// @include      https://karagarga.in/*
//
// ==/UserScript==
//
/*=========================  Version History  ==================================

1.0   -   First public release, only one site added.

==============================================================================*/

function addGlobalStyles(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.className = 'DarkmodeUser';
  style.innerHTML = css;
  head.appendChild(style);
}

function removeGlobalStyles() {  
  var removeEl = [].slice.apply(document.getElementsByClassName("DarkmodeUser"));
  for (var i = 0; i < removeEl.length; i++) {
    removeEl[i].className = removeEl[i].remove();
  }
}

function toggleGlobalStyles() {
  var modestate = window.localStorage['darkmode'];
  if (modestate == "true") {
    const urlHost = window.location.hostname;
    const urlPath = window.location.pathname;
    if (urlHost == 'karagarga.in') {
      if (urlPath == '/browse.php'     ||
          urlPath == '/current.php'    ||
          urlPath == '/history.php'    ||
          urlPath == '/friends.php'    ||
          urlPath == '/bookmarks.php'  ||
          urlPath == '/mytorrents.php' ||
          urlPath == '/userdetails.php' ) {
          addGlobalStyles('img {mix-blend-mode: screen}');
          addGlobalStyles('a div img {mix-blend-mode: normal}');
          addGlobalStyles('table .clear {isolation: isolate}');     
      } else {
          addGlobalStyles('img {mix-blend-mode: screen}');
          addGlobalStyles('table .main {isolation: isolate}');
          addGlobalStyles('table .main img {mix-blend-mode: difference}');
          addGlobalStyles('.spoiler {isolation: isolate}');
          addGlobalStyles('.spoiler img {mix-blend-mode: difference}');
          addGlobalStyles('table .clear {isolation: isolate}');     
      }
    }
  } else {
      removeGlobalStyles();
  } 
}

function addDarkmodeWidget() {
  const options = {
    bottom: '32px',
    right: '32px',
    left: 'unset',
    time: '0.0s',
    mixColor: '#fff',
    backgroundColor: '#fff',
    buttonColorDark: '#100f2c',
    buttonColorLight: '#fff',
    saveInCookies: true,
    label: '',
    autoMatchOsTheme: false
  };
  new Darkmode(options).showWidget();
  document.getElementsByClassName('darkmode-toggle')[0].onclick = function () {toggleGlobalStyles()};
  
  const darkmode = window.localStorage['darkmode'];
  if (darkmode == "true") {
    toggleGlobalStyles();
  }
}

window.addEventListener('load', addDarkmodeWidget);
