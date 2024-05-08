
back_btn = document.getElementById("back"); 
back_btn.addEventListener("click", goBack);

function goBack() {
    history.back();
}