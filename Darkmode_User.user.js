// ==UserScript==
//
// @name         Darkmode User
// @version      1.7.2
// @namespace    https://github.com/Purfview/Darkmode-User
// @description  Darkmode for the websites.
// @icon         https://i.imgur.com/ZftAaI6.png
// @license      MIT
//
// @updateURL    https://greasyfork.org/scripts/421332-darkmode-user/code/Darkmode%20User.meta.js
// @downloadURL  https://greasyfork.org/scripts/421332-darkmode-user/code/Darkmode%20User.user.js
// @homepage     https://github.com/Purfview/Darkmode-User
// @supportURL   https://github.com/Purfview/Darkmode-User/issues
//
// @require      https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js
// @require      https://greasyfork.org/scripts/403996-exev/code/ExEv.js?version=808391
//
// @include      https://karagarga.in/*
// @include      https://secret-cinema.pw/*
// @include      https://forum.doom9.org/*
// @include      https://greasyfork.org/*
// @include      https://www.cinematik.net/*
//
// @run-at       document-start
// @noframes
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

1.3   -   Added Doom9 site.

1.4   -   Added Greasyfork site. Some tweaks for SC and Doom9.

1.5   -   Script wasn't working with Tampermonkey from v1.1. Fixed!

1.6   -   Added Tik site.

1.7   -   New feature: Seamless transitions to darkmode.

1.7.1 -   Less contrast on the toggle button.

1.7.2 -   Fixed KG.

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
    addGlobalStyles('table[cellpadding="10"][bgcolor="red"] {mix-blend-mode: difference}');
  } else {
    addGlobalStyles('img {mix-blend-mode: screen}');
    addGlobalStyles('table .main {isolation: isolate}');
    addGlobalStyles('table .main img {mix-blend-mode: difference}');
    addGlobalStyles('.spoiler {isolation: isolate}');
    addGlobalStyles('.spoiler img {mix-blend-mode: difference}');
    addGlobalStyles('table .clear {isolation: isolate}');
    addGlobalStyles('#hidethissmilies {mix-blend-mode: difference}');
    addGlobalStyles('.outer table[width="750"] {background-color: #f9f9f9}');
    addGlobalStyles('tbody tr td.outer h4 {mix-blend-mode: difference}');
    addGlobalStyles('table[cellpadding="10"][bgcolor="red"] {mix-blend-mode: difference}');
    addGlobalStyles('table[width="660"][cellpadding="10"] tbody tr[style="background-color: #008000; color: #fff;"] {mix-blend-mode: difference}');
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
  addGlobalStyles('iframe {mix-blend-mode: screen}');
  addGlobalStyles('.noty_buttons {mix-blend-mode: difference}');
  addGlobalStyles('.torrentdetails blockquote {background-color: white}');
}

function siteDoom9() {
  addGlobalStyles('img {mix-blend-mode: screen}');
  addGlobalStyles('#vB_Editor_QR_cmd_removeformat img, \
                   #vB_Editor_QR_cmd_bold img, \
                   #vB_Editor_QR_cmd_italic img, \
                   #vB_Editor_QR_cmd_underline img, \
                   #vB_Editor_QR_color_out img \
                   {mix-blend-mode: normal}');
  addGlobalStyles('#vB_Editor_001_controls img {mix-blend-mode: normal}');
  addGlobalStyles('#vB_Editor_001_popup_smilie img, \
                   #vB_Editor_001_cmd_createlink img, \
                   #vB_Editor_001_cmd_unlink img, \
                   #vB_Editor_001_cmd_email img, \
                   #vB_Editor_001_cmd_insertimage img, \
                   #vB_Editor_001_cmd_wrap0_quote img, \
                   #vB_Editor_001_cmd_wrap0_php img \
                   {mix-blend-mode: screen}');
}

function siteGreasyfork() {
  addGlobalStyles('img {mix-blend-mode: screen}');
  addGlobalStyles('#main-header {mix-blend-mode: difference}');
  addGlobalStyles('#site-name a img {mix-blend-mode: normal}');
  addGlobalStyles('#site-name img {mix-blend-mode: normal}');
  addGlobalStyles('#install-area {mix-blend-mode: difference}');
  addGlobalStyles('.script-list-ratings span span {mix-blend-mode: difference}');
  addGlobalStyles('.current {color: #bfbfbf}');
  addGlobalStyles('#about-user {background-color: transparent}');
  addGlobalStyles('#about-user h2 {color: #bfbfbf}');
  addGlobalStyles('#about-user h3 {color: #bfbfbf}');
}

function siteTik() {
  addGlobalStyles('img {mix-blend-mode: screen}');
  addGlobalStyles('#menu img {mix-blend-mode: normal}');
  addGlobalStyles('#menu ul li {background-color: black}');
  addGlobalStyles('#menu ul li a {color: grey}');
  addGlobalStyles('.bottom_nav ul {background-color: black}');
  addGlobalStyles('.msn_img_div1 {mix-blend-mode: screen}');
  addGlobalStyles('.bottom_nav ul a {color: red}');
  addGlobalStyles('.pbox_table td img[width="20"] {mix-blend-mode: overlay}');
  addGlobalStyles('.ri_foto_extra {mix-blend-mode: screen}');
  addGlobalStyles('.thumbos {mix-blend-mode: screen}');
  addGlobalStyles('embed {mix-blend-mode: screen}');
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
    } else if (urlHost == 'www.cinematik.net') {
      siteTik();
    } else if (urlHost == 'forum.doom9.org') {
      siteDoom9();
    } else if (urlHost == 'greasyfork.org') {
      siteGreasyfork();
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
    buttonColorDark: '#333333',
    buttonColorLight: '#b3b3b3',
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

if (Boolean(location.href.match('karagarga.in/details.php'))) {
  document.events.on('bodyloaded', () => {
    addDarkmodeWidget();
  });
} else {
  document.events.on('headloaded', () => {
    addDarkmodeWidget();
  });
}
