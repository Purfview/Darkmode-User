// ==UserScript==
//
// @name         Darkmode User
// @version      1.2
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
// @include      https://secret-cinema.pw/*
//
// ==/UserScript==
//
/*=========================  Version History  ==================================

1.0   -   First public release, only one site added.

1.1   -   Added SC site.
      -   Added basic func for the "unknown" sites at @include.
      -   Sites' specific code was split to separate functions.
      -   Much faster switching to darkmode (no waiting for external images/resources).
      -   Return original background in white mode.

1.2   -   Fixed few SC icons.

==============================================================================*/


//==============================================================================
//    Sites' specific funcs.
//==============================================================================

function siteKG() {
  const urlPath = window.location.pathname;
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

function siteSC() {
  addGlobalStyles('img {mix-blend-mode: screen}');
  addGlobalStyles('#header {mix-blend-mode: screen}');
  addGlobalStyles('.colhead_dark {mix-blend-mode: difference}');
  addGlobalStyles('.fronttab {mix-blend-mode: exclusion}');
  addGlobalStyles('.colhead {mix-blend-mode: difference}');
  addGlobalStyles('.settings_sidebar {isolation: isolate}');
  addGlobalStyles('#textarea_wrap_0 {isolation: isolate}');
  addGlobalStyles('.widethin .header .topbar {mix-blend-mode: difference}');
  addGlobalStyles('.torrent_description table tbody tr {mix-blend-mode: difference}');
  addGlobalStyles('#covers #cover_div_0 .brackets {mix-blend-mode: normal}');
  addGlobalStyles('.wrapicon {mix-blend-mode: normal}');
  addGlobalStyles('.potwicon {mix-blend-mode: normal}');
}

function siteUnknown() {
  addGlobalStyles('img {mix-blend-mode: screen}');
}

//==============================================================================
//   Toggle/Add/Remove funcs.
//==============================================================================

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
    removeEl[i].remove();
  }
}

function toggleGlobalStyles() {
  var modestate = window.localStorage['darkmode'];
  if (modestate == "true") {
    addBackground();
    const urlHost = window.location.hostname;
    if (urlHost == 'karagarga.in') {
      siteKG();
    } else if (urlHost == 'secret-cinema.pw') {
      siteSC();
    } else {
      siteUnknown();
    }
  } else {
    removeGlobalStyles();
    removeBackground();
  }
}

function removeBackground() {
  document.getElementsByClassName('darkmode-background')[0].remove();
}

function addBackground() {
  if (document.querySelector('.darkmode-background') !== null) { return; }
  var backgroundDiv = document.createElement('div');
  backgroundDiv.setAttribute('class', 'darkmode-background');
  document.body.insertBefore(backgroundDiv, document.body.firstChild);
}

//==============================================================================
//    Darkmode.js
//==============================================================================

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
  // Add func to the widged button to toggle styles on click.
  document.getElementsByClassName('darkmode-toggle')[0].onclick = function () {toggleGlobalStyles()};
  // Add styles on the page load.
  const darkmode = window.localStorage['darkmode'];
  if (darkmode == "true") {
    toggleGlobalStyles();
  } else {
    // Remove custom white background.
    removeBackground();
  }
}

window.addEventListener('DOMContentLoaded', addDarkmodeWidget);
