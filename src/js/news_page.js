var data = localStorage.getItem("data");
var entity = JSON.parse(data);

document.getElementById("news_page_title").innerText = entity.nameOfNews;
document.getElementById("news_page_header").innerText = entity.nameOfNews;
document.getElementById("news_page_img").setAttribute("src", entity.photo);
document.getElementById("news_main_text").innerText = entity.text;
