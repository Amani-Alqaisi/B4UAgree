document.getElementsByClassName("loader")[0].style.display = "block";
document.getElementById("content-container").style.display = "none";
document.getElementById("addlink-container").style.display = "none";
document.getElementById("error-container").style.display = "none";

(async () => {
    const response = await chrome.runtime.sendMessage({message: "link"});
    link = response.url
    //console.log(response.url)
    if (link != "Empty") {
        fetchData(link)
    }
    else {
        console.log(link)
        console.log("link wasn't found")
        addLink()
    }
})();

function fetchData(link) {
    // // attempting to fetch summary json from the link found and sent to back end 
    const my_obj = {"privacyPolicy": link};
    console.log(link)
    // post content -- send privacy policy to backend
    // THE CORRECT API endpoint is below 
    // "https://csc324spring2024.us.reclaim.cloud/sum"
    fetch("http://127.0.0.1:5000/sum", {
        mode:  'cors', 
        method: 'POST', 
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(my_obj)
    }).then(function (response) {
        // return result
        return response.text()
    }).then(function (data) {
        try {
           addContent(data);
        }
        // error -- assume couldn't find link or it was broken, which is why we couldn't parse the JSON
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

    // get the "content" div to place the json content 
    const content = document.getElementById("content");

    // each heading and summary pairing, place them with the correct tags inside the "content" div
    for (let [heading, summary] of Object.entries(privacy_data)) {
        if (summary.length > 0) {
            content.innerHTML += `<h2>` + heading + `</h2>` + `<p>` + summary + `</p>` ; 
        }
    }

    // stop loader and show content now 
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementById("content-container").style.display = "block";
}

function addLink() {
    // loader disappears and our form opens
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementById("addlink-container").style.display = "block";
    // after submitting 
    linkForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("I've been submitted!")
        console.log(myLink)
        console.log(myLink.value)
        
        // checking if there is information inside input, if not then throw error
        if (myLink.value == "") {
            appearAlert("You forgot to paste the URL. Please refresh and try again.")
        } 
        else {
            document.getElementsByClassName("loader")[0].style.display = "block";
            document.getElementById("addlink-container").style.display = "none";

            fetchData(myLink.value)
        }
    });
}

function appearAlert(str) {
    const error = document.getElementById("error");

    error.innerHTML += str;

    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementById("content-container").style.display = "none";
    document.getElementById("addlink-container").style.display = "none";
    document.getElementById("error-container").style.display = "block";
}