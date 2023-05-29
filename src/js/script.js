var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}
var checkList2 = document.getElementById('list2');
checkList2.getElementsByClassName('anchor')[0].onclick = function (evt) {
    if (checkList2.classList.contains('visible'))
        checkList2.classList.remove('visible');
    else
        checkList2.classList.add('visible');
}


$(document).ready(function () {
    //Скрыть PopUp при загрузке страницы    
    PopUpHide();
});
//Функция отображения PopUp
function PopUpShow() {
    $("#popup1").show();
}
//Функция скрытия PopUp
function PopUpHide() {
    $("#popup1").hide();
}

const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.trainers_card');

// Устанавливаем начальное значение смещения
let offset = 0;

// Функция для прокрутки слайдов
function scrollSlides() {
    offset -= 1; // Измените значение смещения в нужную сторону

    // Применяем смещение к контейнеру слайдера
    sliderContainer.style.transform = `translateX(${offset}px)`;

    // Проверяем, достигнут ли конец слайдов
    if (offset <= -sliderContainer.offsetWidth) {
        offset = 0; // Возвращаемся к началу
    }

    // Рекурсивно вызываем функцию для создания эффекта бесконечной прокрутки
    requestAnimationFrame(scrollSlides);
}

// Запускаем прокрутку слайдов
scrollSlides();