/* = gettrainers() */;

var trainers = [
    {
        id: 1,
        userID: 1,
        experience: "2 года",
        description: "бубубуб",
    },
    {
        id: 2,
        userID: 2,
        experience: "2 года",
        description: "бубубуб",
    }
]


document.getElementById("submit").addEventListener("click", () => {
    AddTrainer();
    ClearForms();
})


trainers.forEach(trainer => AddTrainerToTable(trainer));


function AddTrainerToTable(trainer) {
    if (!trainers.some(tra => tra.id === trainer.id)) trainers.push(trainer);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowtrainer${trainer.id}">
        <td>${trainer.id}</td>
        <td>${trainer.userID}</td>
        <td>${trainer.experience}</td>
        <td>${trainer.description}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="SelectTrainer(${trainer})">Change</button> 
            <button class="btn btn-danger m-2" onclick="DeleteTrainer(${trainer})">Delete</button> 
        </td>
    </tr>`;
}


function SelectTrainer(trainer) {
    document.getElementById("ID").value = trainer.id;
    document.getElementById("userID").value = trainer.userID;
    document.getElementById("experience").value = trainer.experience;
    document.getElementById("description").value = trainer.description;
}


document.getElementById("update").addEventListener("click", () => {
    if (UpdateTrainer(trainers[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("userID").value = 1;
    document.getElementById("experience").value = "";
    document.getElementById("description").value = "";
}


async function GetTrainers() {
    try {
        const response = await fetch(`https://localhost:7286/api/trainers`);

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


async function UpdateTrainer(trainer) {
    try {
        const trainerString = JSON.stringify(trainer);
        const response = await fetch(`/api/trainers/${trainerString}`, { method: "PUT" });

        if (response.ok === true) {
            const trainer = await response.json();

            UpdateTabletrainer(trainer);

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


async function AddTrainer(trainer) {
    try {
        const trainerString = JSON.stringify(trainer);
        const response = await fetch(`/api/trainers/${trainerString}`, { method: "POST" });

        if (response.ok === true) {
            const trainer = await response.json();

            AddTrainerToTable(trainer);

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


function UpdateTableTrainer(trainer) {
    trainer.userID = document.getElementById("userID").value;
    trainer.experience = document.getElementById("experience").value;
    trainer.description = document.getElementById("description").value;


    let row = document.getElementById(`rowtrainer${trainer.id}`);
    row.innerHTML = `
                <td>${trainer.id}</td>
                <td>${trainer.userID}</td>
                <td>${trainer.experience}</td>
                <td>${trainer.description}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="SelectTrainer(${trainer})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="DeleteTrainer(${trainer})">Delete</button> 
                </td>`
}


async function DeleteTrainer(trainer) {
    try {
        const response = await fetch(`/api/trainers/${trainer.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const trainer = await response.json();

            DeleteTableTrainer(trainer);

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


function DeleteTableTrainer(trainer) {
    trainers.splice(trainers.indexOf(trainer), 1);

    document.getElementById(`rowtrainer${trainer.id}`).remove();
}