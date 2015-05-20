deleg8 -- a Chrome Extension to delegate session access
=======================================================

by Dan Connolly <http://www.madmode.com/>

Share and Enjoy according to the terms of the MIT Open Source License.

For a scripted process that consumes exported Simple banking
transactions, full account credentials (username and password) are
more than is needed. Session credentials, which are revokeable and in
fact revoked as a matter of course, are sufficient.

This Chrome Extension adds a page action to the Simple account
activity page. Invoking the action brings up session credentials in
JSON, suitable for copy-and-paste to scripted processes.

Flow of control and authority
-----------------------------

 1. When you `load the extension`__, you grant privileges in `manifest.json` to the extension.
 2. `manifest.json` says to grant to `bg.js`:
       - `onOnstalled`__ via `background: { scripts: ... }`
       - `pageAction`__ by `page_action: { ... }`
       - `webNavigation`__, activeTab_, and
       - `cross-origin access to insert code`__ into simple.com pages
 3. In `bg.js`, we use webNavigation to listen to onCompleted events for the simple.com activity page.
    When we get such an event,
     1. We use activeTab.runScript to inject shareToken.js, which gets
         - the dom of the simple activity page and
         - a channel to listen for messages from the extension
     2. shareToken.js
        1. injects a script that evaluates `_token` in the activity page scope and then
        2. adds a message handler that sends the token to the requestor
     2. In `bg.js`, we use pageAction to show popup.html
 4. When the user clicks on the pageAction icon in the toolbar, `popup.html` gets
     - DOM access to the popup,
     - activeTab_, cookies, and cross-origin access simple.com
 5. popup.html loads the (powerless) creds.js module and runs popup.js, which attenuates its
    access a bit and then calls creds to
    handle page onLoaded by sending a "shareToken" message to the content page and
    display the response along with the `_simple_session` cookie.

__ https://developer.chrome.com/extensions/getstarted#unpacked
__ https://developer.chrome.com/extensions/runtime#event-onInstalled
__ https://developer.chrome.com/extensions/pageAction
__ https://developer.chrome.com/extensions/webNavigation
__ https://developer.chrome.com/extensions/content_scripts#pi
.. _activeTab: https://developer.chrome.com/extensions/activeTab

I made some attempt to use `object capability style`__ by pushing use of ambient authority to the edges.

__ http://www.erights.org/elib/capability/ode/ode-capabilities.html
