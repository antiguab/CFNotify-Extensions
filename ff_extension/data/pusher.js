//Logs when events are received
Pusher.log = function(message) {
  console.log(message);
};

//initializes web sockets
var pusher = new Pusher("19a6c30b18c4c19e98f3", {
  // Disable stats - Chrome doesn't allow non-HTTPS scripts
  disableStats: true
});

//sets up a web socket to communicate with CloudForms
var channel = pusher.subscribe("admin_channel");
channel.bind("pusher:subscription_succeeded", function() {});

//send a message back with the post received
channel.bind("status_update", function(post) {
  self.postMessage(post);
});