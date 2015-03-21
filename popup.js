/* popup - script from page_action popup */

/*jshint undef: true*/
/*globals console, document, chrome */

console.log("@@script: popup.js");
document.addEventListener('DOMContentLoaded', function() {
  console.log("@@popup DOMContentLoaded");

  var creds = {};

  var s = document.getElementById('status');
  console.log('status elt:', s);
  s.textContent = "S1";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    s.textContent = "S2";

    chrome.tabs.sendMessage(
      tabs[0].id,
      {greeting: "hello from popup.js@@"},
      function(token) {
	s.textContent = "S3";

	console.log('token: ', token);
	creds._token = token;
	console.log('creds: ', creds);

	chrome.cookies.getAll({}, function(cookies) {
	  s.textContent = "S4";
	  console.log(cookies);
	  var session = cookies.filter(function(c) {
	    return c.name == "_simple_session"; });
	  creds._simple_session = session[0].value;
	  s.textContent = 'creds: ' + JSON.stringify(creds);
	});
      });
  });
});
