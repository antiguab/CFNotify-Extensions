// Enable Pusher logging (only for testing)
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

//showing number of unseen notifications in toolbar
var badgeCount = 0;

var pusher = new Pusher("19a6c30b18c4c19e98f3", {
  // Disable stats - Chrome doesn't allow non-HTTPS scripts
  disableStats: true
});

var popupPort;
chrome.extension.onConnect.addListener(function(port) {
  popupPort = port;

  // Reset badge count when open
  badgeCount = 0;
  chrome.browserAction.setBadgeText({text: ""});

  popupPort.onDisconnect.addListener(function() {
    popupPort = undefined;
  });
});


//Create user web socket to communicate with CloudForms
var channel = pusher.subscribe("admin_channel");
channel.bind("pusher:subscription_succeeded", function() {});

channel.bind("status_update", function(post) {
  
  //create desktop notification
  var options = {
        type: "basic",
        title: "Request ID: " + post.request_id,
        message: "Status: " + post.status,
        iconUrl: "notification-icon.png",
        isClickable: true
  }

  chrome.notifications.create("new-post-" + post.id, options, function(id) {});

  badgeCount++;

  chrome.browserAction.setBadgeText({text: badgeCount.toString()});

  // Send post to popup if connected
  if (popupPort) {
    popupPort.postMessage(post);
  }
});