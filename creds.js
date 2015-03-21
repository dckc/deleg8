// creds -- show session cookie and CSRF token

/*jshint undef: true */
/*globals self */

// console.log("module: creds.js");

(function (definition) {
  // <script> module pattern from Q, via UMD / AMD / require.js
  // https://github.com/kriskowal/q/blob/v1/q.js
  self.creds = definition();
})(function() {
  "use strict";

  return function(onLoaded, sendMessageToActiveTab, withCookie) {
    var creds = {};

    onLoaded(function(ui) {
      // console.log('status elt:', ui.status);
      ui.status.textContent = "page action loaded...";
      sendMessageToActiveTab(
	"shareToken",
	function(token) {
	  ui.status.textContent = "reply received...";
	  
	  // console.log('token: ', token);
	  creds._token = token;
	  // console.log('creds: ', creds);
	  
	  withCookie("_simple_session", function(session) {
	    ui.status.textContent = "found cookie...";
	    // console.log(session);
	    creds._simple_session = session.value;
	    ui.status.textContent = JSON.stringify(creds);
	  });
	});
    });
  };
});
