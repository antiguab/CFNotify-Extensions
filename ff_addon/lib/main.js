

//Required Modules
var togglebuttons = require('sdk/ui/button/toggle');
var self = require("sdk/self");
var panels = require("sdk/panel");
var timers = require("sdk/timers");
var notifications = require("sdk/notifications");

//Panel Configuration========
//Appears when toolbar button is clicked
var popup = panels.Panel({
  width: 440,
  height:500,
  contentURL: self.data.url("popup.html"),
  contentScriptFile:[self.data.url("jquery-2.1.1.min.js"),self.data.url("popup.js")],
  onHide: handleHide
});

//Button Configuration========
//Appears in toolbar, and is clicked to display popup above
var button = togglebuttons.ToggleButton({
  id: "cfnotify",
  label: "CFNotify",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

function handleChange(state) {
  if (state.checked) {
    popup.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

//Desktop Notifications Configuration========
//Appear when an update is received

var delay = 1;
var posts = [];

var pageWorker = require("sdk/page-worker").Page({
  contentURL: self.data.url("pusher.html"),
  contentScriptFile: [self.data.url("pusher.min.js"),self.data.url("pusher.js")],
  onMessage: function(post){
    posts[posts.length] = post;

    //delay notifications or else firefox dispays them incorrectly
    var timerId = timers.setTimeout(function() {
      popup.port.emit("post_recieved",post);
      notifications.notify({
      title: "Request ID: " + post.request_id,
      text: "Status: " + post.status,
      tag: post.id,
      iconURL: self.data.url("icon-64.png"),
      });
      var index = posts.indexOf(post);
      posts.splice(index,1);

      //once all notifications are displayed we can reset the delay back to 1
      if(posts.length == 0){
        delay =1;
      }
    }, delay*1000);
    
    delay+= 7;
  }
});

