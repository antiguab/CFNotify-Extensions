#CFNotify Extensions
##Overview
This README covers how set up the Firefox addon / Chrome extension, which uses pusher to recieve live updates.

##Setup

###Environment
To run the Chrome extension no extra set up is required. To run the Firefox add on, you will need the [addon sdk](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).

###Usage

Below you'll find how to use each extension, but first clone the repo to your local machine with:

```
git clone https://github.com/antiguab/CFNotify-Extensions.git
```

####Chrome Extension

To install, open Chrome and go to: **Windows** > **Extension**. Make sure you have Developer Mode checked ( in the top right corner). Click the **Load unpacked extension...** button and choose the **chrome_extension** folder as root. You should now have the chrome extension next to the omnibar.

####FireFox Addon

To install, open a terminal and run:

```
cd path/to/local/ff_addon
cfx run
```
This will open a firefox browser with the extension next to the url bar.

####Recieving Updates
The extensions only listen for the admin user's updates.
**TODO: add other users feature**