var posts;

//Initialize when the page is loaded
window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    init();
},false);

//add post to pop up in real time
self.port.on('post_recieved', function(post) {
    addPost(post);
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
};

// create a post for the popup from a web socket update
var addPost = function(post) {
  var postDOM = document.createElement("div"); 
  postDOM.classList.add("post");
    postDOM.innerHTML += "<h2> Request ID: " + post.request_id + "</h2>";
    postDOM.innerHTML += "<p> Status: " + post.status + "</p>";
    postDOM.innerHTML += "<span class='avatar'><img src='icon-64.png'></span>";
    posts.insertBefore(postDOM, posts.firstChild);
};

// ceate a post for the popup from querying the database
var addPostFromStatus = function(status) {

  var postDOM = document.createElement("div"); 
  postDOM.classList.add("post");
  var request;
  $.getJSON("http://still-everglades-1007.herokuapp.com/requests/"+status.request_id+".json", function(request) {
    postDOM.innerHTML += "<h2> Request ID: " + request.cfid + "</h2>";
    postDOM.innerHTML += "<p> Status: " + status.content + "</p>";
    postDOM.innerHTML += "<span class='avatar'><img src='icon-64.png'></span>";

    if(posts.lastChild == null){
    posts.insertBefore(postDOM, posts.firstChild);
    }
    else{
    posts.lastChild.parentNode.insertBefore(postDOM, posts.lastChild.nextSibling);
    }
  });
}