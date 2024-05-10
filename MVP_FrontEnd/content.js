
// immediately execute the code in this fashion
fetchLink(findLink())

// findLink() finds the link to the privacy policy on the current webpage or tab of the Chrome Extension
function findLink() {
    // attempt to find link in a <a></a> in the document 
    let link = document.evaluate("//a[contains(text(), 'Policy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    // can't find it <a></a>? 
    if (link === null) {
            return "empty"
    }
    return link
}

// fetchLink() grabs the HTML content from the found link
function fetchLink(link) {
    // if we are able to find privacy or cookie policy 
    if (link != "empty") {
            // grab url only of the <a> tag
            curr_url = link.getAttribute("href"); 

            // checks if it starts correctly and then updates accordingly
            if (!curr_url.startsWith("https:")) {
                let start = "https:";
                curr_url = start.concat(curr_url);
            }

            // post content -- send privacy policy to server-worker, background.js
            // will cause the popup to occur 
            (async () => {
                const response = await chrome.runtime.sendMessage({message: "open", url: curr_url});
            })();

    } 
    // else we couldn't find privacy or cookie policy
    else {
         // post content -- send "Empty" to server-worker, background.js
         // will cause the popup to occur 
        (async () => {
            const response = await chrome.runtime.sendMessage({message: "open", url: "Empty"});
        })();
    }
}
