/* = Getactivities().slice(0,4) */;
/* = GetTrainers().slice(0,4) */;
/* = GetNews().slice(0,3) */;

var activities = [
    {
        id: 1,
        nameOfactivity: "Йога",
        description: "бубубу",
        photo: "img/yoga.png",
        icon: "icons/yoga.svg",
        duration: 60,
    },
    {
        id: 2,
        nameOfactivity: "Растяжка",
        description: "бубубу",
        photo: "img/stretching.png",
        icon: "icons/stretching.svg",
        duration: 60,
    },
    {
        id: 2,
        nameOfactivity: "Растяжка",
        description: "бубубу",
        photo: "img/stretching.png",
        icon: "icons/stretching.svg",
        duration: 60,
    }
]

var trainers = [
    {
        id: 1,
        user: {
            id: 1,
            roleId: 1,
            surname: "Шинакрук",
            name: "София",
            middleName: "Олеговна",
            email: "shinkaruks@mer.ci.nsu.ru",
            phone: "+79046478828",
            password: "123",
            gender: "Женский",
            dateOfBirtd: "2003-11-21",
            photo: "img/triner_ulia.png",
            vkontakte: "awfultthing",
            telegram: "awfultthing",
            city: "Новосибирск"
        },
        experience: "2 года",
        description: "бубубуб",
        activities: [
            {
                id: 1,
                nameOfactivity: "Йога",
                description: "бубубу",
                photo: "img/yoga.png",
                icon: "icons/yoga.svg",
                duration: 60,
            },
            {
                id: 2,
                nameOfactivity: "Растяжка",
                description: "бубубу",
                photo: "img/stretching.png",
                icon: "icons/stretching.svg",
                duration: 60,
            }
        ]

    },
    {
        id: 2,
        user: {
            id: 2,
            roleId: 2,
            surname: "Тябин",
            name: "Иван",
            middleName: "Олеговна",
            email: "shinkaruks@meer.ci.nsu.ru",
            phone: +79046478828,
            password: "123",
            gender: "Женский",
            dateOfBirtd: "2003-11-21",
            photo: "img/trainer_denis.png",
            vkontakte: "awfultthing",
            telegram: "awfultthing",
            city: "Новосибирск"
        },
        experience: "2 года",
        description: "бубубуб",
        activities: [
            {
                id: 1,
                nameOfactivity: "Йога",
                description: "бубубу",
                photo: "img/yoga.png",
                icon: "icons/yoga.svg",
                duration: 60,
            }
        ]
    }
]

var articles = [
    {
        id: 1,
        nameOfNews: "Обалдеть что!",
        description: "бубубу",
        text: "бубуб в 2 раза длиннее",
        photo: "img/news1.png",
    },
    {
        id: 2,
        nameOfNews: "Обалдеть что 2!",
        description: "бубубу",
        text: "бубуб в 2 раза длиннее",
        photo: "img/news2.png"
    },
    {
        id: 3,
        nameOfNews: "Обалдеть что 3!",
        description: "бубубу",
        text: "бубуб в 2 раза длиннее",
        photo: "img/news3.png"
    }
]

activities.forEach(activity => AddactivityToPage(activity));



function AddactivityToPage(activity) {
    if (!activities.some(act => act.id === activity.id)) activities.push(activity);

    document.getElementById("indexTrainingsSectionContainer").innerHTML += `
   
    <div class="trainings_card_wrapper_mini xl-hidden_on_index">

    <div class="trainings_card_text_wrapper">
        <div class="card_header">
            <img src="${activity.icon}" class="mini_icon">
            <h2 class="card_name">${activity.nameOfactivity}</h2>
        </div>
        <div class="card_descr">
        ${activity.description}
        </div>
        <button onclick="ChangeToActivityPage(${activity.id})" class="all_btn">Подробнее<img
                src="icons/back_arrow_subheader3.svg" class="btn_arrow"></button>
    </div>

    <img src="img/yoga.png" alt="yoga" class="trainings_card_mini_img">
</div>

    <div class="trainings_card_wrapper md-hidden_on_index">
    <div class="trainings_card_text_content">
        <div class="card_header">
            <img src="${activity.icon}" class="mini_icon">
            <h2 class="card_name">${activity.nameOfactivity}</h2>
        </div>
        <div class="card_descr">
            ${activity.description}
        </div>
        <button onclick="ChangeToActivityPage(${activity.id})" class="all_btn">Подробнее<img
                src="icons/back_arrow_subheader3.svg" class="btn_arrow"></button>
    </div>
    <img src="${activity.photo}" class="trainings_card_imgs">
</div>`;
}

trainers.forEach(trainer => AddTrainerToPage(trainer));

function AddTrainerToPage(trainer) {
    if (!trainers.some(train => train.id === trainer.id)) trainers.push(trainer);
    document.getElementById("trainers_section").innerHTML += `
        <div class="col-6 col-lg-3 col-md-4">
                <div class="trainers_card" onclick="ChangeToTrainerPage(${trainer.id})">
                    <div class="first_circle">
                        <div class="second_circle">
                            <img src="${trainer.user && trainer.user.photo}" class="circle_img">
                        </div>
                    </div>
                    <h2 class="trainer_name">${trainer.user && trainer.user.name}</h2>
                    <h3 class="trainer_subtitle">${trainer.activities && trainer.activities.map(activity => activity.nameOfactivity).join(', ')}</h3>
                </div>
        </div>
    `;
}

articles.forEach(article => AddArticleToPage(article));

function AddArticleToPage(article) {
    if (!articles.some(art => art.id === article.id)) articles.push(article);

    var isLast = articles[articles.length - 1].id === article.id;

    var wrapperClass = isLast ? "news_card_wrapper last" : "news_card_wrapper";

    document.getElementById("news_section").innerHTML += `
    <div class="col-6 col-md-4">
  
    <div class="${wrapperClass}" onclick="ChangeToNewsPage (${article.id})">
        <div class="news_card_content">
            <div class="news_card_img_wrapper">
                <img src="${article.photo}" class="news_card_img">
            </div>
            <div class="news_card_text_wrapper">
                <h2 class="news_card_header">${article.nameOfNews}</h2>
                <h3 class="news_card_subheader">${article.description}</h3>
            </div>

        </div>
    </div>
  
</div>
    `;
}

function ChangeToTrainerPage(trainerId) {
    var trainer = trainers.find(train => train.id === trainerId);
    localStorage.setItem("data", JSON.stringify(trainer));
    window.location.href = "trainer_page.html";
}
function ChangeToActivityPage(activityId) {
    var activity = activities.find(act => act.id === activityId);
    localStorage.setItem("data", JSON.stringify(activity))
    window.location.href = "activity_page.html";
}

function ChangeToNewsPage(articleId) {
    var article = articles.find(art => art.id === articleId);
    localStorage.setItem("data", JSON.stringify(article))
    window.location.href = "news_page.html";
}

async function Getactivities() {
    try {
        const response = await fetch(`https://localhost:7286/api/activities`);

        if (response.ok === true) {
            activities = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}
async function GetTrainers() {
    try {
        const response = await fetch(`https://localhost:7286/api/trainers`);

        if (response.ok === true) {
            trainers = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}
async function GetNews() {
    try {
        const response = await fetch(`https://localhost:7286/api/news`);

        if (response.ok === true) {
            articles = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}