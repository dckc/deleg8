/* popup - script from page_action popup */

/*jshint undef: true*/
/*globals console, document, chrome */
/*globals creds */ /* cf popup.html */

console.log("@@script: popup.js");

(function() {
  var onLoaded = function(h) {
    document.addEventListener('DOMContentLoaded', function() {
      console.log("@@popup DOMContentLoaded");

      var ui = {
	status: document.getElementById('status')
      };
      h(ui);
    });
  };

  var sendMessageToCurrentTab = function(msg, cb) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, msg, cb);
    });
  };

  var withCookies = function(h) {
    chrome.cookies.getAll({}, h);
  };

  creds(onLoaded, sendMessageToCurrentTab, withCookies);
})();
