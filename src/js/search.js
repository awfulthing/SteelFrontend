var searchIcon = document.getElementById("searchIcon");
var searchBox = document.querySelector(".search_box");

searchIcon.addEventListener("click", function () {
    searchBox.style.display = searchBox.style.display === "none" ? "block" : "none";
});