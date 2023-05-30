/* = getdirections() */;

var directions = [
    {
        id: 1,
        nameOfDirection: "Йога",
        description: "бубубу",
        photo: "",
        duration: 60,
    },
    {
        id: 2,
        nameOfDirection: "Растяжка",
        description: "бубубу",
        photo: "",
        duration: 60,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Adddirection();
    ClearForms();
})


directions.forEach(direction => AdddirectionToTable(direction));


function AdddirectionToTable(direction) {
    directions.push(direction);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowdirection${direction.id}">
        <td>${direction.id}</td>
        <td>${direction.nameOfDirection}</td>
        <td>${direction.description}</td>
        <td>${direction.photo}</td>
        <td>${direction.duration}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectdirection(${direction})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deletedirection(${direction})">Delete</button> 
        </td>
    </tr>`;
}


function Selectdirection(direction) {
    document.getElementById("ID").value = direction.id;
    document.getElementById("nameOfDirection").value = direction.nameOfDirection;
    document.getElementById("description").value = direction.description;
    document.getElementById("photo").value = direction.photo;
    document.getElementById("duration").value = direction.duration;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updatedirection(directions[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("nameOfDirection").value = 1;
    document.getElementById("description").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("duration").value = "";
}


async function Getdirections() {
    try {
        const response = await fetch(`https://localhost:7286/api/directions`);

        if (response.ok === true) {
            directions = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}


async function Updatedirection(direction) {
    try {
        const directionString = JSON.stringify(direction);
        const response = await fetch(`/api/directions/${directionString}`, { method: "PUT" });

        if (response.ok === true) {
            const direction = await response.json();

            UpdateTabledirection(direction);

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


async function Adddirection(direction) {
    try {
        const directionString = JSON.stringify(direction);
        const response = await fetch(`/api/directions/${directionString}`, { method: "POST" });

        if (response.ok === true) {
            const direction = await response.json();

            AdddirectionToTable(direction);

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


function UpdateTabledirection(direction) {
    direction.nameOfDirection = document.getElementById("nameOfDirection").value;
    direction.description = document.getElementById("description").value;
    direction.photo = document.getElementById("photo").value;
    direction.duration = document.getElementById("duration").value;


    let row = document.getElementById(`rowdirection${direction.id}`);
    row.innerHTML = `
                <td>${direction.id}</td>
                <td>${direction.nameOfDirection}</td>
                <td>${direction.description}</td>
                <td>${direction.photo}</td>
                <td>${direction.duration}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectdirection(${direction})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deletedirection(${direction})">Delete</button> 
                </td>`
}


async function Deletedirection(direction) {
    try {
        const response = await fetch(`/api/directions/${direction.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const direction = await response.json();

            DeleteTabledirection(direction);

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


function DeleteTabledirection(direction) {
    directions.splice(directions.indexOf(direction), 1);

    document.getElementById(`rowdirection${direction.id}`).remove();
}