document.getElementsByClassName("loader")[0].style.display = "block";
document.getElementById("content-container").style.display = "none";
document.getElementById("addlink-container").style.display = "none";
document.getElementById("error-container").style.display = "none";

// attempting to fetch summary json from the link found and sent to back end 
fetch("http://127.0.0.1:5000/sum", { 
    mode:  'cors', 
    method: 'GET',
}).then(function (response) {
    // return result
    return response.text()
}).then(function (data) {
    console.log(data)
    // if successful summary and transitions previously 
    try {
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
    // error -- assume couldn't find link or it was broken, which is why we couldn't parse the JSON
    catch(err) {
            console.log(document.getElementById("content-container"))
            // loader disappears and our form opens
            document.getElementsByClassName("loader")[0].style.display = "none";
            document.getElementById("addlink-container").style.display = "block";
    
            // after submitting 
            linkForm.addEventListener("submit", (e) => {
                 e.preventDefault();
                 console.log("I've been submitted!")
                
                // checking if there is information inside input, if not then throw error
                if (link.value == "") {
                     appearAlert("You forgot to paste the URL. Please refresh and try again.")
                } 
                else {
                    document.getElementsByClassName("loader")[0].style.display = "block";
                    document.getElementById("addlink-container").style.display = "none";

                    //sending provided link to backend 
                    const my_obj = {"privacyPolicy": link.value};
                    fetch("http://127.0.0.1:5000/sendpolicy", {
                        mode:  'cors', 
                        method: 'POST', 
                        headers: { "Content-type": "application/json"},
                        body: JSON.stringify(my_obj)
                    }).then(function (response) {
                            // if we sent the link successully, then continue
                             if (response.status === 200) {
                                console.log("successful link")
                                fetch("http://127.0.0.1:5000/sum", { 
                                    mode:  'cors', 
                                    method: 'GET',
                                }).then(function (response) {
                                    // return result
                                    return response.text()
                                }).then(function (data) {
                                    try {
                                        // if successful, we can parse json 
                                        const privacy_data = JSON.parse(data); 
                                
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
                                    // error found, then we cannot summarize this policy
                                    catch {
                                        appearAlert("Our programs are unable to parse and summarize the contents of this webpage. We apologize.")
                                    }
                                }) 
                           }
                            // error found, then we cannot summarize this policy
                           else {
                               appearAlert("Our programs are unable to parse and summarize the contents of this webpage. We apologize.")
                           }
                   });
                }
            });
        } 
}).catch(function (error) {
    console.log('Request failed', error);
    appearAlert("Our programs are unable to parse and summarize the contents of this webpage. We apologize.")
});

function appearAlert(str) {
    const error = document.getElementById("error");

    error.innerHTML += str;

    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementById("content-container").style.display = "none";
    document.getElementById("addlink-container").style.display = "none";
    document.getElementById("error-container").style.display = "block";
}