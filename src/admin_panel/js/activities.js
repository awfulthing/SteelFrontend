/* = getactivities() */;

var activities = [
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
    Addactivity();
    ClearForms();
})


activities.forEach(activity => AddactivityToTable(activity));


function AddactivityToTable(activity) {
    activities.push(activity);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowactivity${activity.id}">
        <td>${activity.id}</td>
        <td>${activity.directionID}</td>
        <td>${activity.trainerID}</td>
        <td>${activity.dateTime}</td>
        <td>${activity.places}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectactivity(${activity})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleteactivity(${activity})">Delete</button> 
        </td>
    </tr>`;
}


function Selectactivity(activity) {
    document.getElementById("ID").value = activity.id;
    document.getElementById("IDdirections").value = activity.directionID;
    document.getElementById("trainerID").value = activity.trainerID;
    document.getElementById("dateTime").value = activity.dateTime;
    document.getElementById("numberOfSeats").value = activity.places;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updateactivity(activities[document.getElementById("ID").value])) {
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


async function Updateactivity(activity) {
    try {
        const activitiestring = JSON.stringify(activity);
        const response = await fetch(`/api/activities/${activitiestring}`, { method: "PUT" });

        if (response.ok === true) {
            const activity = await response.json();

            UpdateTableactivity(activity);

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


async function Addactivity(activity) {
    try {
        const activitiestring = JSON.stringify(activity);
        const response = await fetch(`/api/activities/${activitiestring}`, { method: "POST" });

        if (response.ok === true) {
            const activity = await response.json();

            AddactivityToTable(activity);

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


function UpdateTableactivity(activity) {
    activity.directionID = document.getElementById("IDdirections").value;
    activity.trainerID = document.getElementById("trainerID").value;
    activity.dateTime = document.getElementById("dateTime").value;
    activity.places = document.getElementById("numberOfSeats").value;


    let row = document.getElementById(`rowactivity${activity.id}`);
    row.innerHTML = `
                <td>${activity.id}</td>
                <td>${activity.directionID}</td>
                <td>${activity.trainerID}</td>
                <td>${activity.dateTime}</td>
                <td>${activity.places}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectactivity(${activity})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deleteactivity(${activity})">Delete</button> 
                </td>`
}


async function Deleteactivity(activity) {
    try {
        const response = await fetch(`/api/activities/${activity.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const activity = await response.json();

            DeleteTableactivity(activity);

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


function DeleteTableactivity(activity) {
    activities.splice(activities.indexOf(activity), 1);

    document.getElementById(`rowactivity${activity.id}`).remove();
}