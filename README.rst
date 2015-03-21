deleg8 -- a Chrome Extension to delegate session access.

by Dan Connolly <http://www.madmode.com/>
Share and Enjoy according to the terms of the MIT Open Source License.

For a scripted process that consumes exported Simple banking
transactions, full account credentials (username and password) are
more than is needed. Session credentials, which are revokeable and in
fact revoked as a matter of course, are sufficient.

This Chrome Extension adds a page action to the Simple account
activity page. Invoking the action brings up session credentials in
JSON, suitable for copy-and-paste to scripted processes.
