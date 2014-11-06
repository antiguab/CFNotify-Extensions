var posts;
var port = chrome.extension.connect({name: "CFNotify"});

// Run as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  init();
});

var init = function() {
  posts = document.querySelector(".posts");

  // Request most recent Statuses
  $.getJSON("http://still-everglades-1007.herokuapp.com/statuses.json", function(posts) {
    // Reverse posts
    posts.reverse();
    for (var i = 0; i < 10; i++) {
      addPostFromStatus(posts[i]);
    };
  });

  // Listen for realtime updates from background process
  port.onMessage.addListener(function(post) {
    addPost(post);
  });

};


// create a post for the popup from a web socket update
var addPost = function(post) {
  var postDOM = document.createElement("div"); 
  postDOM.classList.add("post");
    postDOM.innerHTML += "<h2> Request ID: " + post.request_id + "</h2>";
    postDOM.innerHTML += "<p> Status: " + post.status + "</p>";
    postDOM.innerHTML += "<span class='avatar'><img src='icon.png'></span>";
    posts.insertBefore(postDOM, posts.firstChild);
};


// ceate a post for the popup from querying the database
var addPostFromStatus = function(status) {
  var postDOM = document.createElement("div"); 
  postDOM.classList.add("post");
  var request;
  $.getJSON("http://still-everglades-1007.herokuapp.com/requests/"+status.request_id, function(request) {
    postDOM.innerHTML += "<h2> Request ID: " + request.cfid + "</h2>";
    postDOM.innerHTML += "<p> Status: " + status.content + "</p>";
    postDOM.innerHTML += "<span class='avatar'><img src='icon.png'></span>";

    if(posts.lastChild == null){
    posts.insertBefore(postDOM, posts.firstChild);
    }
    else{
    posts.lastChild.parentNode.insertBefore(postDOM, posts.lastChild.nextSibling);
    }
  });
}
