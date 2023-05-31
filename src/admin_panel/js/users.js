/* = getUsers() */;

//Пустышки
var users = [
    {
        id: 1,
        roleId: 1,
        surname: "Шинакрук",
        name: "София",
        middleName: "Олеговна",
        email: "shinkaruks@meer.ci.nsu.ru",
        phone: +79046478828,
        password: "123",
        gender: "Женский",
        dateOfBirtd: "2003-11-21",
        photo: "",
        vkontakte: "",
        telegram: "",
        city: "Новосибирск"
    },
    {
        id: 2,
        roleId: 1,
        surname: "Тябин",
        name: "Иван",
        middleName: "Алексеевич",
        email: "vanya@mail.ru",
        phone: 89134749515,
        password: "123",
        gender: "Мужской",
        dateOfBirtd: "2003-11-08",
        photo: "",
        vkontakte: "",
        telegram: "",
        city: "Новосибирск"
    }
]

//Добавить по кнопке
document.getElementById("submit").addEventListener("click", () => {
    AddUser();
    ClearForms();
})

//Добавление пользователей из базы в таблицу
users.forEach(user => AddUserToTable(user));

//Добавление пользователей в табилцу
function AddUserToTable(user) {
    if (!users.some(u => u.id === user.id)) users.push(user);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowUser${user.id}">
        <td>${user.id}</td>
        <td>${user.roleId}</td>
        <td>${user.surname}</td>
        <td>${user.name}</td>
        <td>${user.middleName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.password}</td>
        <td>${user.gender}</td>
        <td>${user.dateOfBirtd}</td>
        <td>${user.photo}</td>
        <td>${user.vkontakte}</td>
        <td>${user.telegram}</td>
        <td>${user.city}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="SelectUser(${user})">Change</button> 
            <button class="btn btn-danger m-2" onclick="DeleteUser(${user})">Delete</button> 
        </td>
    </tr>`;
}

//Отобразить по кнопке "Change"
function SelectUser(user) {
    document.getElementById("ID").value = user.id;
    document.getElementById("role_id").value = user.roleId;
    document.getElementById("surname").value = user.surname;
    document.getElementById("name").value = user.name;
    document.getElementById("patronymic").value = user.middleName;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("password").value = user.password;
    document.getElementById("gender").value = user.gender;
    document.getElementById("dateOfBirtd").value = user.dateOfBirtd;
    document.getElementById("photo").value = user.photo;
    document.getElementById("vk").value = user.vkontakte;
    document.getElementById("telegram").value = user.telegram;
    document.getElementById("city").value = user.city;
}

//Обновить по кнопке
document.getElementById("update").addEventListener("click", () => {
    if (UpdateUser(users[document.getElementById("ID").value])) {
        ClearForms();
    }
});

//Обнулить формы
function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("role_id").value = 1;
    document.getElementById("surname").value = "";
    document.getElementById("name").value = "";
    document.getElementById("patronymic").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("password").value = "";
    document.getElementById("gender").value = "Мужской";
    document.getElementById("dateOfBirtd").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("vk").value = "";
    document.getElementById("telegram").value = "";
    document.getElementById("city").value = "";
}

//Получить пользователей из бд
async function GetUsers() {
    try {
        const response = await fetch(`https://localhost:7286/api/users`);

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

//Обновить пользователя в БД и в таблицу
async function UpdateUser(user) {
    try {
        const userString = JSON.stringify(user);
        const response = await fetch(`/api/users/${userString}`, { method: "PUT" });

        if (response.ok === true) {
            const user = await response.json();

            UpdateTableUser(user);

            return true;
        } else {
            const error = await response.json();
            console.log(error.message);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Добавить пользователя в БД и в таблицу
async function AddUser(user) {
    try {
        const userString = JSON.stringify(user);
        const response = await fetch(`/api/users/${userString}`, { method: "POST" });

        if (response.ok === true) {
            const user = await response.json();

            AddUserToTable(user);

            return true;
        } else {
            const error = await response.json();
            console.log(error.message);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Обновить данные пользователя в таблице
function UpdateTableUser(user) {
    user.roleId = document.getElementById("role_id").value;
    user.surname = document.getElementById("surname").value;
    user.name = document.getElementById("name").value;
    user.middleName = document.getElementById("patronymic").value;
    user.email = document.getElementById("email").value;
    user.phone = document.getElementById("phone").value;
    user.password = document.getElementById("password").value;
    user.gender = document.getElementById("gender").value;
    user.dateOfBirtd = document.getElementById("dateOfBirtd").value;
    user.photo = document.getElementById("photo").value;
    user.vkontakte = document.getElementById("vk").value;
    user.telegram = document.getElementById("telegram").value;
    user.city = document.getElementById("city").value;

    let row = document.getElementById(`rowUser${user.id}`);
    row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.roleId}</td>
                <td>${user.surname}</td>
                <td>${user.name}</td>
                <td>${user.middleName}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.password}</td>
                <td>${user.gender}</td>
                <td>${user.dateOfBirtd}</td>
                <td>${user.photo}</td>
                <td>${user.vkontakte}</td>
                <td>${user.telegram}</td>
                <td>${user.city}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="SelectUser(${user})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="DeleteUser(${user})">Delete</button> 
                </td>`
}

//Удалить пользователя из БД
async function DeleteUser(user) {
    try {
        const response = await fetch(`/api/users/${user.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const user = await response.json();

            DeleteTableUser(user);

            return true;
        } else {
            const error = await response.json();
            console.log(error.message);
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Удалить пользователя из таблицы
function DeleteTableUser(user) {
    users.splice(users.indexOf(user), 1);

    document.getElementById(`rowUser${user.id}`).remove();
}