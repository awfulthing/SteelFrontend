function openPopup() {
    var popup = document.getElementById("popup");
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    popup.classList.add("popup_visible");
    overlay.addEventListener("click", closePopup);
    document.addEventListener("keydown", handleKeyPress);
}

function closePopup() {
    var popup = document.getElementById("popup");
    var overlay = document.querySelector(".overlay");
    document.body.removeChild(overlay);
    popup.classList.remove("popup_visible");
    overlay.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    if (event.keyCode === 27) {
        closePopup();
    }
}
function openConfirmingPopup() {
    var confirmingPopup = document.getElementById("confirming_popup");
    var overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    confirmingPopup.classList.add("confirming_popup_visible");
    overlay.addEventListener("click", closeConfirmingPopup);
    document.addEventListener("keydown", handleKeyPress);
}

function closeConfirmingPopup() {
    var confirmingPopup = document.getElementById("confirming_popup");
    var overlay = document.querySelector(".overlay");
    document.body.removeChild(overlay);
    confirmingPopup.classList.remove("confirming_popup_visible");
    overlay.removeEventListener("click", closeConfirmingPopup);
    document.removeEventListener("keydown", handleKeyPress);
}
document.getElementById("signupButton").addEventListener("click", function (event) {
    event.preventDefault();
    closePopup();
    openConfirmingPopup();
});
document.getElementById("signupButtonMobile").addEventListener("click", function (event) {
    event.preventDefault();
    openConfirmingPopup();
});

document.getElementById("closeButton").addEventListener("click", function (event) {
    closeConfirmingPopup();
});