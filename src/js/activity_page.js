/*= GetTeachers()*/
var teachers = [
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

var data = localStorage.getItem("data");
var activity = JSON.parse(data);

document.getElementById("activity_page_title").innerText = activity.nameOfactivity;
document.getElementById("training_name").innerText = activity.nameOfactivity;
document.getElementById("training_descr").innerText = activity.description;
document.getElementById("banner").setAttribute("src", activity.photo);
document.getElementById("training_name").innerText = activity.nameOfactivity;

teachers.forEach(teacher => AddteacherToPage(teacher));

function AddteacherToPage(teacher) {
    if (!teachers.some(teach => teach.id === teacher.id)) teachers.push(teacher);
    document.getElementById("trainer_on_activity_page").innerHTML += `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="trainers_card"  onclick="ChangeToteacherPage (${teacher.id})">
                <div class="first_circle">
                    <div class="second_circle">
                        <img src="${teacher.user && teacher.user.photo}" class="circle_img">
                    </div>
                </div>
                <h2 class="trainer_name">${teacher.user && teacher.user.name}</h2>
            </div>
         </div>
    `;
}


function ChangeToteacherPage(teacherId) {
    var teacher = teachers.find(teach => teach.id === teacherId);
    localStorage.setItem("data", JSON.stringify(teacher));
    window.location.href = "trainer_page.html";
}

async function GetTeachers() {
    try {
        const response = await fetch(`/api/teachers/activity/${activity.id}`);

        if (response.ok === true) {
            return await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}

