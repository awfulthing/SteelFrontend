function toggleFilter(filterId) {
    var filter = document.getElementById(filterId);
    filter.classList.toggle('show');
}

function toggleCheckbox(option) {
    var checkbox = option.querySelector("input[type='checkbox']");
    checkbox.checked = !checkbox.checked;
}

function getSelectedOptions() {
    var checkboxes = document.querySelectorAll(".filter_option input[type='checkbox']:checked");
    var selectedOptions = [];
    checkboxes.forEach(function (checkbox) {
        selectedOptions.push(checkbox.value);
    });
    console.log(selectedOptions);
}