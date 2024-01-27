A Mini Toast Notification Library using React.js.
Reference Website: https://unthread-logic-assignment.netlify.app

Layout:
The main component has a header section, a navigation section, and a
body section.

Notification specifications:
It is visible from the main application's bottom center.

It is there for 7 seconds (the default notification time), after which it fades out, but when the user mouses over the toast before it fades out, the toast timer resets, and it is there until the notification time.

7 seconds are user-configurable.

If the user clicks on the "x" icon it disappears immediately.

The component is made in such a way that it can handle multiple
messages. If toast is already displayed, other queued-up messages will
be displayed alongside the currently displayed toast, with the most
recent on top. Max. 3 messages can be displayed, and the rest can be
queued up and displayed when slots are available.

"Component1" has a button, and on click, a toast notification is
displayed with a default message.

"Component2" has a form with an input and a button; on click, whatever
is in the input is displayed in the toast notification.

"Component3" has a form with an input and a button. The user can enter a
few seconds in the input field and then click on the button. Once the
button is clicked, it does a reverse count of that many seconds, and
once it reaches 0, it makes an API call to
"https://api.knowmee.co/api/v1/master/get-country-list" and displays the
list of countries with pagination.

Create two public Github repositories for this assignment 
