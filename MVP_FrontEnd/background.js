
// waiting for the extension to be clicked
// executes the content.js code -- finds the privacy policy on the current tab
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  }); 
});

// global variable to hold all created popup windows links to privacy policies
let links = {}; 

// listens for a message from content.js 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      // if "open" - then it's from content.js. this message makes the popup appear
       if (request.message === "open") {
        // link holds the privacy policy link found from content.js (if not found, then it's the word "Empty")
        link = request.url; 
        chrome.windows.create({url: "index.html", 
          type: "popup", 
          width:  400, 
          height: 600, 
          top: 0,
          left: 0,
          focused : true, 
        }).then(function (win) {
          // add window id as key and its privacy policy link as the value to links
            links[win.id] = link;
        });
      // else if "link" -- then it's from popup.js. this message sends the privacy policy link to popup.js, which would make the approriate fetch call
      } else if (request.message === "link") {
        sendResponse({url: link, urls: links});
      } 
  }
);
