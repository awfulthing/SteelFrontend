/* = getTeatcherDirections() */;

var TeatcherDirections = [
    {
        id: 1,
        activityID: 1,
        trainerID: 1,
    },
    {
        id: 2,
        activityID: 2,
        trainerID: 2,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    AddTeatcherDirection();
    ClearForms();
})


TeatcherDirections.forEach(TeatcherDirection => AddTeatcherDirectionToTable(TeatcherDirection));


function AddTeatcherDirectionToTable(TeatcherDirection) {
    TeatcherDirections.push(TeatcherDirection);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowTeatcherDirection${TeatcherDirection.id}">
        <td>${TeatcherDirection.id}</td>
        <td>${TeatcherDirection.activityID}</td>
        <td>${TeatcherDirection.trainerID}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="SelectTeatcherDirection(${TeatcherDirection})">Change</button> 
            <button class="btn btn-danger m-2" onclick="DeleteTeatcherDirection(${TeatcherDirection})">Delete</button> 
        </td>
    </tr>`;
}


function SelectTeatcherDirection(TeatcherDirection) {
    document.getElementById("ID").value = TeatcherDirection.id;
    document.getElementById("activityID").value = TeatcherDirection.activityID;
    document.getElementById("trainerID").value = TeatcherDirection.trainerID;
}


document.getElementById("update").addEventListener("click", () => {
    if (UpdateTeatcherDirection(TeatcherDirections[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("activityID").value = "";
    document.getElementById("trainerID").value = 1;
}


async function GetTeatcherDirections() {
    try {
        const response = await fetch(`https://localhost:7286/api/TeatcherDirections`);

        if (response.ok === true) {
            TeatcherDirections = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}


async function UpdateTeatcherDirection(TeatcherDirection) {
    try {
        const TeatcherDirectionString = JSON.stringify(TeatcherDirection);
        const response = await fetch(`/api/TeatcherDirections/${TeatcherDirectionString}`, { method: "PUT" });

        if (response.ok === true) {
            const TeatcherDirection = await response.json();

            UpdateTableTeatcherDirection(TeatcherDirection);

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


async function AddTeatcherDirection(TeatcherDirection) {
    try {
        const TeatcherDirectionString = JSON.stringify(TeatcherDirection);
        const response = await fetch(`/api/TeatcherDirections/${TeatcherDirectionString}`, { method: "POST" });

        if (response.ok === true) {
            const TeatcherDirection = await response.json();

            AddTeatcherDirectionToTable(TeatcherDirection);

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


function UpdateTableTeatcherDirection(TeatcherDirection) {
    TeatcherDirection.activityID = document.getElementById("activityID").value;
    TeatcherDirection.trainerID = document.getElementById("trainerID").value;


    let row = document.getElementById(`rowTeatcherDirection${TeatcherDirection.id}`);
    row.innerHTML = `
                <td>${TeatcherDirection.id}</td>
                <td>${TeatcherDirection.activityID}</td>
                <td>${TeatcherDirection.trainerID}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="SelectTeatcherDirection(${TeatcherDirection})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="DeleteTeatcherDirection(${TeatcherDirection})">Delete</button> 
                </td>`
}


async function DeleteTeatcherDirection(TeatcherDirection) {
    try {
        const response = await fetch(`/api/TeatcherDirections/${TeatcherDirection.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const TeatcherDirection = await response.json();

            DeleteTableTeatcherDirection(TeatcherDirection);

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


function DeleteTableTeatcherDirection(TeatcherDirection) {
    TeatcherDirections.splice(TeatcherDirections.indexOf(TeatcherDirection), 1);

    document.getElementById(`rowTeatcherDirection${TeatcherDirection.id}`).remove();
}