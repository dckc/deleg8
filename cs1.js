console.log('content script 1');

// ack: http://stackoverflow.com/a/21784877
var scr = document.createElement('script');
scr.id = 'token-sharing-script';
scr.textContent = 'document.getElementById("token-sharing-script").setAttribute("data-token", _token)';
(document.head || document.documentElement).appendChild(scr);

// The background page is asking us to ...
if (window == top) {
  chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
    console.log('@@onRequest listener...');
    sendResponse(scr.getAttribute("data-token"));
    console.log('@@sent _token');
  });
}
