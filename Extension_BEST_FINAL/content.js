
fetchLink(findLink())

// findLink() finds the link to the privacy policy on the current webpage or tab of the Chrome Extension
function findLink() {
    // attempt to find link in a <a></a> in the document 
    let link = document.evaluate("//a[contains(text(), 'Policy')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    console.log(link)
    // can't find it <a></a>? 
    if (link === null) {
            return "empty"
    }
    return link
}

// fetchLink() grabs the HTML content from the found link
function fetchLink(link) {
    if (link != "empty") {
            // Mia H -- this needs to be updated to be more expansive of different types of links
            
            // grab url only of the <a> tag
            curr_url = link.getAttribute("href")

            // Mia H -- would like more checks in this conditional of link formats
            // checks if it starts correctly and then updates accordingly
            if (!curr_url.startsWith("https:")) {
                let start = "https:";
                curr_url = start.concat(curr_url);
            }

            // creates an object to send to backend 
            //const my_obj = {"privacyPolicy": curr_url};
            //console.log(curr_url)
            // post content -- send privacy policy to backend 
            (async () => {
                const response = await chrome.runtime.sendMessage({message: "open", url: curr_url});
            })();

    } 
    else {
        // open popup now 
        (async () => {
            const response = await chrome.runtime.sendMessage({message: "open", url: "Empty"});
        })();
    }
}
