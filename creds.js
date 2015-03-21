/*jshint undef: true */
/*globals console, define, self */

console.log("@@module: creds.js");

// module pattern from Q
// https://github.com/kriskowal/q/blob/v1/q.js
(function (definition) {
  "use strict";
  
  if (typeof define === "function" && define.amd) {
    define(definition);
  // <script> context
  } else if (typeof self !== "undefined") {
    self.creds = definition();
  } else {
    throw new Error("Expected `self` from <script> context.");
  }
})(function() {
  "use strict";

  return function(onLoaded, sendMessageToCurrentTab, withCookies) {
    var creds = {};

    onLoaded(function(ui) {
      console.log('status elt:', ui.status);
      ui.status.textContent = "S1";
      sendMessageToCurrentTab(
	{greeting: "hello from popup.js@@"},
	function(token) {
	  ui.status.textContent = "S3";
	  
	  console.log('token: ', token);
	  creds._token = token;
	  console.log('creds: ', creds);
	  
	  withCookies(function(cookies) {
	    ui.status.textContent = "S4";
	    console.log(cookies);
	    var session = cookies.filter(function(c) {
	      return c.name == "_simple_session"; });
	    creds._simple_session = session[0].value;
	    ui.status.textContent = 'creds: ' + JSON.stringify(creds);
	  });
	});
    });
  };
});
