
// waiting for the extension to be clicked
// executes the content.js code -- findss the privacy policy
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  }); 
});

let link = "Empty"; 
// listens for a message from content.js 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // awaits for message and then will make the popup appear
         if (request.message === "open") {
          chrome.windows.create({url: "index.html", 
            type: "popup", 
            width:  400, 
            height: 800, 
            top: 0,
            left: 0, 
            focused : true, 
          }).then(function (doc) {
              //console.log(document.getElementById("content"))
              // console.log(doc.tabs[0])
              // console.log(doc.tabs[0].id)
              // chrome.scripting.executeScript({
              //   target: {tabId: doc.tabs[0].id},
              //   files: ['popup.js']
              // }); 
          }); 
        }  
    }
);
