/*jshint undef: true */
/*global chrome, console */


chrome.runtime.onInstalled.addListener(function() {
  console.log("@@installed" + new Date().toISOString());

  chrome.webNavigation.onCompleted.addListener(
    function(details) {
      console.log('llegamos la pagina simple.com/activity!@@', details);
      chrome.tabs.executeScript(details.tabId, {
	file: "cs1.js"
      });
      chrome.pageAction.show(details.tabId);
    },
    { url: [{urlEquals: "https://bank.simple.com/activity" }] });

/*    
  chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript( { file: 'cs1.js' } );
  });
  console.log("@@pageAction.onClick listener added");
*/

/*@@
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("@@tab activated", activeInfo);
    chrome.pageAction.show(activeInfo.tabId);
    console.log("@@pageAction shown");
  });
  console.log("@@tab query installed");
*/
});

