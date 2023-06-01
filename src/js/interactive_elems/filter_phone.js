function toggleFilterMenu(event) {
    event.stopPropagation();

    var filterMenu = document.getElementById("filterMenu");
    filterMenu.classList.toggle("filter_menu_active");
    document.body.classList.toggle("overlay");

    if (filterMenu.classList.contains("filter_menu_active")) {
        document.addEventListener("click", closeFilterMenuOutside);
    } else {
        document.removeEventListener("click", closeFilterMenuOutside);
    }
}

function closeFilterMenuOutside(event) {
    var filterMenu = document.getElementById("filterMenu");
    if (!filterMenu.contains(event.target) && !event.target.matches(".filters_button")) {
        toggleFilterMenu(event);
    }
}

var filtersButton = document.querySelector(".filters_button");
filtersButton.addEventListener("click", toggleFilterMenu);