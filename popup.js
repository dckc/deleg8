/* popup - script from page_action popup */

/*jshint undef: true*/
/*globals document, chrome */
/*globals creds */ /* cf popup.html */

// console.log("script: popup.js");

// We get the DOM of the page action popup,
// plus activeTab, cookies, and cross-origin access simple.com
// from manifest permissions.

(function(dom, activeTab, cookies, simple) {
  "use strict";

  var onLoaded = function(h) {
    dom.addEventListener('DOMContentLoaded', function() {
      // console.log("popup DOMContentLoaded");

      var ui = {
	status: dom.getElementById('status')
      };
      h(ui);
    });
  };

  var sendMessageToActiveTab = function(msg, cb) {
    activeTab.query({active: true, currentWindow: true}, function(answer) {
      activeTab.sendMessage(answer[0].id, msg, cb);
    });
  };

  var withCookie = function(name, h) {
    cookies.get({name: name, url: simple}, h);
  };

  creds(onLoaded, sendMessageToActiveTab, withCookie);
})(document, chrome.tabs, chrome.cookies, "https://bank.simple.com/");
