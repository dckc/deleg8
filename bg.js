/* bg -- at the session page, install shareToken.js, show page action UI. */

/*jshint undef: true */
/*global chrome */

// These privileges are granted by manifest.json:
// onOnstalled via background: { scripts: ... }
// pageAction by page_action: { ... }
// webNavigation, activeTab, and cross-origin access to simple.com
// by permissions: [ ... ]
//
// "To insert code into a page, your extension must have cross-origin
// permissions for the page."
// https://developer.chrome.com/extensions/content_scripts#pi
// https://developer.chrome.com/extensions/xhr#requesting-permission
(function(onInstalled, pageAction, webNavigation, activeTab, simple) {
  onInstalled.addListener(function() {
    // console.log("installed" + new Date().toISOString());

    webNavigation.onCompleted.addListener(
      function(details) {
	// console.log('navigation completed ', details);

	activeTab.executeScript(details.tabId, { file: "shareToken.js" });
	pageAction.show(details.tabId);
      },
      { url: [{urlEquals: simple + 'activity' }] });
  });
})(chrome.runtime.onInstalled,
   chrome.pageAction,
   chrome.webNavigation,
   chrome.tabs,
   "https://bank.simple.com/");
