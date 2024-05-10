
// waiting for the extension to be clicked
// executes the content.js code -- findss the privacy policy
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  }); 
});

let link = "Empty"; 
let links = {}; 
// listens for a message from content.js 
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      // awaits for message and then will make the popup appear
       if (request.message === "open") {
        link = request.url; 
        chrome.windows.create({url: "index.html", 
          type: "popup", 
          width:  400, 
          height: 600, 
          top: 0,
          left: 0,
          focused : true, 
        }).then(function (win) {
            links[win.id] = link;
        });
        //links[open_windows] = link; 
      } else if (request.message === "link") {
        sendResponse({url: link, urls: links});
      } 
  }
);
