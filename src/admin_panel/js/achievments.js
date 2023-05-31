/* = getachievments() */;

var achievments = [
    {
        id: 1,
        nameOfAchievment: "Обалдеть что!",
        description: "бубубу",
        photo: "",
    },
    {
        id: 2,
        nameOfAchievment: "Обалдеть что 2!",
        description: "бубубу",
        photo: "",
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addachievment();
    ClearForms();
})


achievments.forEach(achievment => AddachievmentToTable(achievment));


function AddachievmentToTable(achievment) {
    if (!achievments.some(ach => ach.id === achievment.id)) achievments.push(achievment);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowachievment${achievment.id}">
        <td>${achievment.id}</td>
        <td>${achievment.nameOfAchievment}</td>
        <td>${achievment.description}</td>
        <td>${achievment.photo}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectachievment(${achievment})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleteachievment(${achievment})">Delete</button> 
        </td>
    </tr>`;
}


function Selectachievment(achievment) {
    document.getElementById("ID").value = achievment.id;
    document.getElementById("nameOfAchievment").value = achievment.nameOfAchievment;
    document.getElementById("description").value = achievment.description;
    document.getElementById("photo").value = achievment.photo;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updateachievment(achievments[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("nameOfAchievment").value = 1;
    document.getElementById("description").value = "";
    document.getElementById("photo").value = "";
}


async function Getachievments() {
    try {
        const response = await fetch(`https://localhost:7286/api/achievments`);

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


async function Updateachievment(achievment) {
    try {
        const achievmentString = JSON.stringify(achievment);
        const response = await fetch(`/api/achievments/${achievmentString}`, { method: "PUT" });

        if (response.ok === true) {
            const achievment = await response.json();

            UpdateTableachievment(achievment);

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


async function Addachievment(achievment) {
    try {
        const achievmentString = JSON.stringify(achievment);
        const response = await fetch(`/api/achievments/${achievmentString}`, { method: "POST" });

        if (response.ok === true) {
            const achievment = await response.json();

            AddachievmentToTable(achievment);

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


function UpdateTableachievment(achievment) {
    achievment.nameOfAchievment = document.getElementById("nameOfAchievment").value;
    achievment.description = document.getElementById("description").value;
    achievment.photo = document.getElementById("photo").value;


    let row = document.getElementById(`rowachievment${achievment.id}`);
    row.innerHTML = `
                <td>${achievment.id}</td>
                <td>${achievment.nameOfAchievment}</td>
                <td>${achievment.description}</td>
                <td>${achievment.text}</td>
                <td>${achievment.photo}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectachievment(${achievment})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deleteachievment(${achievment})">Delete</button> 
                </td>`
}


async function Deleteachievment(achievment) {
    try {
        const response = await fetch(`/api/achievments/${achievment.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const achievment = await response.json();

            DeleteTableachievment(achievment);

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


function DeleteTableachievment(achievment) {
    achievments.splice(achievments.indexOf(achievment), 1);

    document.getElementById(`rowachievment${achievment.id}`).remove();
}