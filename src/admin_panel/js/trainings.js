/* = gettrainings() */;

var trainings = [
    {
        id: 1,
        directionID: 1,
        trainerID: 1,
        dateTime: "2003-11-21",
        places: 12,
    },
    {
        id: 2,
        directionID: 2,
        trainerID: 2,
        dateTime: "2003-11-22",
        places: 13,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addtraining();
    ClearForms();
})


trainings.forEach(training => AddtrainingToTable(training));


function AddtrainingToTable(training) {
    if (!trainings.some(trai => trai.id === training.id)) trainings.push(training);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowtraining${training.id}">
        <td>${training.id}</td>
        <td>${training.directionID}</td>
        <td>${training.trainerID}</td>
        <td>${training.dateTime}</td>
        <td>${training.places}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selecttraining(${training})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deletetraining(${training})">Delete</button> 
        </td>
    </tr>`;
}


function Selecttraining(training) {
    document.getElementById("ID").value = training.id;
    document.getElementById("IDdirections").value = training.directionID;
    document.getElementById("trainerID").value = training.trainerID;
    document.getElementById("dateTime").value = training.dateTime;
    document.getElementById("numberOfSeats").value = training.places;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updatetraining(trainings[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("IDdirections").value = 1;
    document.getElementById("trainerID").value = 1;
    document.getElementById("dateTime").value = "";
    document.getElementById("numberOfSeats").value = "";
}


async function Gettrainings() {
    try {
        const response = await fetch(`https://localhost:7286/api/trainings`);

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


async function Updatetraining(training) {
    try {
        const trainingstring = JSON.stringify(training);
        const response = await fetch(`/api/trainings/${trainingstring}`, { method: "PUT" });

        if (response.ok === true) {
            const training = await response.json();

            UpdateTabletraining(training);

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


async function Addtraining(training) {
    try {
        const trainingstring = JSON.stringify(training);
        const response = await fetch(`/api/trainings/${trainingstring}`, { method: "POST" });

        if (response.ok === true) {
            const training = await response.json();

            AddtrainingToTable(training);

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


function UpdateTabletraining(training) {
    training.directionID = document.getElementById("IDdirections").value;
    training.trainerID = document.getElementById("trainerID").value;
    training.dateTime = document.getElementById("dateTime").value;
    training.places = document.getElementById("numberOfSeats").value;


    let row = document.getElementById(`rowtraining${training.id}`);
    row.innerHTML = `
                <td>${training.id}</td>
                <td>${training.directionID}</td>
                <td>${training.trainerID}</td>
                <td>${training.dateTime}</td>
                <td>${training.places}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selecttraining(${training})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deletetraining(${training})">Delete</button> 
                </td>`
}


async function Deletetraining(training) {
    try {
        const response = await fetch(`/api/trainings/${training.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const training = await response.json();

            DeleteTabletraining(training);

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


function DeleteTabletraining(training) {
    trainings.splice(trainings.indexOf(training), 1);

    document.getElementById(`rowtraining${training.id}`).remove();
}