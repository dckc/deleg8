/* shareToken -- share CSRF token from session page to extension */

/*jshint undef: true */
/*globals document, chrome */

// console.log('shareToken content script');

// This is a content script invoked via executeScript() from bg.js.
// Chrome content scripts get access to the DOM and to
// the extension via message passing.
// https://developer.chrome.com/extensions/content_scripts
// https://developer.chrome.com/extensions/contentSecurityPolicy#interactions
// https://developer.chrome.com/extensions/messaging
(function(dom, onMessage) {
  "use strict";

  // "content scripts ... cannot ... use variables or functions
  // defined by web pages ..." however "DOM injected scripts that
  // would be executed immediately upon injection into the page will
  // execute as you might expect."
  var share = function(expr, id, attr) {
    var scr = dom.createElement('script');
    scr.id = id;
    scr.textContent = (
      'document.getElementById("' + id + '")' +
	'.setAttribute("data-share", ' + expr + ')');
    (dom.head || dom.documentElement).appendChild(scr);
    return scr.getAttribute('data-share');
  };

  var token = share('_token', 'token-sharing-script');

  onMessage.addListener(function(req, sender, sendResponse) {
    // console.log('onRequest listener...');
    sendResponse(token);
    // console.log('sent _token');
  });
})(document, chrome.runtime.onMessage);
