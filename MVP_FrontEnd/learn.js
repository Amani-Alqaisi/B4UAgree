// grab back_btn on the learn more page
back_btn = document.getElementById("back"); 

// wait for it to be clicked
back_btn.addEventListener("click", goBack);

// when clicked, return to previous page
function goBack() {
    history.back();
}