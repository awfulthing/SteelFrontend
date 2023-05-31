var reviews = [
    {
        id: 1,
        trainer: {
            id: 1,
            experience: "2 года",
            description: "бубубуб",
        },
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
        text: "бубубу",
        grade: 5,
    },
    {
        id: 2,
        trainer: {
            id: 1,
            experience: "2 года",
            description: "бубубуб",
        },
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
        text: "бубубу",
        grade: 4,
    }
]

var data = localStorage.getItem("data");
var teacher = JSON.parse(data);

document.getElementById("trainer_page_title").innerText = teacher.user.name + ' ' + teacher.user.surname;
document.getElementById("account_photo").setAttribute("src", teacher.user.photo);
document.getElementById("account_name").innerText = teacher.user.name + ' ' + teacher.user.surname;
document.getElementById("account_add_info").innerText = teacher.activities && teacher.activities.map(activity => activity.nameOfactivity).join(', ') + ', опыт работы ' + teacher.experience;
document.getElementById("city").innerText = teacher.user.city;
document.getElementById("vk").innerText = teacher.user.vkontakte;
document.getElementById("telega").innerText = teacher.user.telegram;
document.getElementById("phone").innerText = teacher.user.phone;
document.getElementById("phone_small").innerText = teacher.user.phone;
document.getElementById("email").innerText = teacher.user.email;
document.getElementById("email_small").innerText = teacher.user.email;
document.getElementById("additional_info").innerText = teacher.description;

var lastTwoReviews = reviews.slice(-2);

lastTwoReviews.forEach(review => AddReviewToPage(review));

function AddReviewToPage(review) {
    if (!reviews.some(rew => rew.id === review.id)) reviews.push(review);
    document.getElementById("review_section").innerHTML += `
    <div class="reviews_wrapper">
    <div class="header_line">
        <div class="review_line">
            <div class="review_img_wrapper">
                <img src="${review.user.photo}" class="review_img">
            </div>

            <div class="reviewers_name">${review.user.name}</div>
        </div>

        <div class="raiting">
            <img src="icons/star_filled.svg" class="raiting_img">
            <div class="raiting_text">${review.grade}</div>
        </div>
    </div>
    <div class="review_text">
    ${review.text}
    </div>
</div>
    `;
}


async function Getreviews() {
    try {
        const response = await fetch(`/api/reviews/teacher/${teacher.id}`);

        if (response.ok === true) {
            return await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
};