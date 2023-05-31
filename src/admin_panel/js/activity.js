/* = getactivities() */;

var activities = [
    {
        id: 1,
        nameOfactivity: "Йога",
        description: "бубубу",
        photo: "",
        icon: "",
        duration: 60,
    },
    {
        id: 2,
        nameOfactivity: "Растяжка",
        description: "бубубу",
        photo: "",
        icon: "",
        duration: 60,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addactivity();
    ClearForms();
})


activities.forEach(activity => AddactivityToTable(activity));


function AddactivityToTable(activity) {
    if (!activities.some(act => act.id === activity.id)) activities.push(activity);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowactivity${activity.id}">
        <td>${activity.id}</td>
        <td>${activity.nameOfactivity}</td>
        <td>${activity.description}</td>
        <td>${activity.photo}</td>
        <td>${activity.icon}</td>
        <td>${activity.duration}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectactivity(${activity})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleteactivity(${activity})">Delete</button> 
        </td>
    </tr>`;
}


function Selectactivity(activity) {
    document.getElementById("ID").value = activity.id;
    document.getElementById("nameOfactivity").value = activity.nameOfactivity;
    document.getElementById("description").value = activity.description;
    document.getElementById("photo").value = activity.photo;
    document.getElementById("icon").value = activity.icon;
    document.getElementById("duration").value = activity.duration;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updateactivity(activities[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("nameOfactivity").value = 1;
    document.getElementById("description").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("icon").value = "";
    document.getElementById("duration").value = "";
}


async function Getactivities() {
    try {
        const response = await fetch(`https://localhost:7286/api/activities`);

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
    activity.nameOfactivity = document.getElementById("nameOfactivity").value;
    activity.description = document.getElementById("description").value;
    activity.photo = document.getElementById("photo").value;
    activity.icon = document.getElementById("icon").value;
    activity.duration = document.getElementById("duration").value;


    let row = document.getElementById(`rowactivity${activity.id}`);
    row.innerHTML = `
                <td>${activity.id}</td>
                <td>${activity.nameOfactivity}</td>
                <td>${activity.description}</td>
                <td>${activity.photo}</td>
                <td>${activity.icon}</td>
                <td>${activity.duration}</td>
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