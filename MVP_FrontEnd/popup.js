
// when immediately activated -- hide all elements except our loading page
document.getElementsByClassName("loader")[0].style.display = "block";
document.getElementsByTagName("body")[0].style.backgroundColor = "#383b38";
document.getElementById("content-container").style.display = "none";
document.getElementById("addlink-container").style.display = "none";
document.getElementById("error-container").style.display = "none";
document.getElementById("learn-container").style.display = "none";

// default view of summaries -- by topic
let summary_type = "topic"; 

// holds our JSON object of summaries 
let curr_data = {}; 

// listens when summaryType on index.html is clicked and changes the summary view (headings or topics) accordingly 
type_btn = document.getElementById("summaryType"); 
type_btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (summary_type == "topic") {
        summary_type = "headings"; 
        addContent(curr_data);
    }
    else {
        summary_type = "topic"; 
        addContent(curr_data);
    }
});

// our original and immediate execution of events 
(async () => {
    // grabs the current window id, which is needed to match window to privacy policy link
    const current = await chrome.windows.getCurrent().then(function (win) {return win.id});

    // asks the service-worker, background.js, for privacy policies (which was provided by content.js)
    const response = await chrome.runtime.sendMessage({message: "link"});

    // all_links is a object with windows as keys and privacy policy links as values 
    all_links = response.urls;

    // get the privacy policy for the current window
    link = all_links[current]; 

    // if we actually have their privacy policy, then go ahead and fetch the data
    if (link != "Empty") {
        fetchData(link)
    }
    // else let's ask the user to provide the privacy policy link 
    else {
        addLink()
    }
})();

// fetchData(link) -> performs the fetch call to the webserver and/or backend, so we can get our privacy policy summaries. 
// if successful, then it will continue onto addContent(data). else, we will recieve an error.
function fetchData(link) {
    // - creating variables to hold the needed parameters to perform our fetch call to webserver 
    const myHeaders = new Headers();
    myHeaders.append("privacyPolicy", link);

    const requestOptions = {
        mode:  'cors', 
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    // requesting data from the web server 
    fetch("https://csc324spring2024.us.reclaim.cloud/sum", requestOptions
    ).then(function (response) {
        // return result
        return response.text()
    }).then(function (data) {
        // send our successful summary to addContent(data) and update our global variable to hold data
        try {
           addContent(data);
           curr_data = data;
        }
        // error occured -- server connection broke or wasn't able to parse the content 
        catch(err) { 
            console.log('Request failed', err);
            appearAlert("Our programs are unable to parse and summarize the contents of this webpage. We apologize.")
        }
    });
}

function addContent(data) {
    // if successful, we can parse json 
    const privacy_data = JSON.parse(data); 
                
    // if JSON was completed, but its empty
    if (data == "{}") {
        appearAlert("Our programs are unable to parse and summarize the contents of this webpage. We apologize.")
    }

    // get the "content" and "rating" `div`s to place the json content 
    const content = document.getElementById("content");
    const rating = document.getElementById("rating");

    // clear them out to ensure they don't hold previous html content 
    rating.innerHTML = "";
    content.innerHTML = "";

    // grab the privacy policy score and round up to 3 places
    let print_score = Math.round(privacy_data["PrivacyPolicyScore"] * 100) / 100;
    
    // change color of rating font by privacy safety level - bad and good hold our cutoffs
    let bad = 6.9; 
    let good = 6.6; 

    // default background color for score is black
    let color = "black"
    
    // -- assign color to background for score 
    // check if it's a good score
    if (print_score <= good) {
        color = "#1F993D"; 
    }
    // check if it's a bad score
    else if (print_score >= bad) {
        color = "#E5362E"; 
    }
    // else it's an average score
    else {
        color = "#E5BA2E"; 
    }

    // add the rating to its container 
    rating.innerHTML += `<h1 style="background-color:` + color + `;">` + "Score: " + print_score.toString() + `</h1>` 

    // -- check which summary view is wanted and provide the relevant content 
    if (summary_type === "topic") {
        // change the button name, so users know how to change to the other view
        type_btn.value = "Change to Detailed View";
        
        // grab the correct object - topics
        let topic_data = privacy_data["topics_summary"]; 

        // add the approriate content to the webpage 
        for (let [topic, summary] of Object.entries(topic_data)) {
            content.innerHTML += `<h2>` + topic.trim().replace(/\u00a0/g, ' ') + `</h2>` + `<p>` + summary + `</p>` ; 
        }
    }
    else {
        // change the button name, so users know how to change to the other view
        type_btn.value = "Change to Topic View";

        // grab the correct object - topics
        let headings_data = privacy_data["headings_summary"]; 
        
        // add the approriate content to the webpage 
        for (let [heading, summary] of Object.entries(headings_data)) {

            // check that we don't have empty summaries 
            if (summary.length > 0 && summary != "\u00a0") {
                content.innerHTML += `<h2>` + heading.trim().replace(/\u00a0/g, ' ') + `</h2>` + `<p>` + summary + `</p>` ; 
            }
        }
    }


    // stop loader and show content now 
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f9f9f9";
    document.getElementById("content-container").style.display = "block";
    document.getElementById("learn-container").style.display = "block";
    
}

// addLink() -> shows the webpage for users to add a link to a privacy policy they found themselves and sends that to be fetched
function addLink() {

    // loader disappears and our form opens
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f9f9f9";
    document.getElementById("addlink-container").style.display = "block";
    document.getElementById("learn-container").style.display = "block";


    // after submitting 
    linkForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // checking if there is information inside input, if not then throw error
        if (myLink.value == "") {
            appearAlert("You forgot to paste the URL. Please refresh and try again.")
        } 
        // if link is in there
        else {
            // make loader appear again and the rest to dissappear
            document.getElementsByClassName("loader")[0].style.display = "block";
            document.getElementsByTagName("body")[0].style.backgroundColor = "#383b38";
            document.getElementById("addlink-container").style.display = "none";
            document.getElementById("learn-container").style.display = "none";

            //send privacy policy to be fetched, meaning to be sent to webserver and/or backend
            fetchData(myLink.value)
        }
    });
}

//appearAlert(str) -> will make `str` appear on webpage in the approriate error format
function appearAlert(str) {

    // grab the correct div
    const error = document.getElementById("error");

    // add error message
    error.innerHTML += `<p>` + str + `<p>`;

    // then make it appear and the rest to dissappear
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementById("content-container").style.display = "none";
    document.getElementById("addlink-container").style.display = "none";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f9f9f9";
    document.getElementById("error-container").style.display = "block";
    document.getElementById("learn-container").style.display = "block";
    
}