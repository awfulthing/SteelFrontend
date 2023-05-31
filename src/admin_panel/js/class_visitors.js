/* = getvisits() */;

var visits = [
    {
        id: 1,
        activityID: 1,
        userID: 1,
    },
    {
        id: 2,
        activityID: 2,
        userID: 2,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addvisit();
    ClearForms();
})


visits.forEach(visit => AddvisitToTable(visit));


function AddvisitToTable(visit) {
    if (!visits.some(v => v.id === visit.id)) visits.push(visit);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowvisit${visit.id}">
        <td>${visit.id}</td>
        <td>${visit.activityID}</td>
        <td>${visit.userID}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectvisit(${visit})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deletevisit(${visit})">Delete</button> 
        </td>
    </tr>`;
}


function Selectvisit(visit) {
    document.getElementById("ID").value = visit.id;
    document.getElementById("activityID").value = visit.activityID;
    document.getElementById("userID").value = visit.userID;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updatevisit(visits[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("activityID").value = 1;
    document.getElementById("userID").value = "";
}


async function Getvisits() {
    try {
        const response = await fetch(`https://localhost:7286/api/visits`);

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


async function Updatevisit(visit) {
    try {
        const visitString = JSON.stringify(visit);
        const response = await fetch(`/api/visits/${visitString}`, { method: "PUT" });

        if (response.ok === true) {
            const visit = await response.json();

            UpdateTablevisit(visit);

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


async function Addvisit(visit) {
    try {
        const visitString = JSON.stringify(visit);
        const response = await fetch(`/api/visits/${visitString}`, { method: "POST" });

        if (response.ok === true) {
            const visit = await response.json();

            AddvisitToTable(visit);

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


function UpdateTablevisit(visit) {
    visit.activityID = document.getElementById("activityID").value;
    visit.userID = document.getElementById("userID").value;


    let row = document.getElementById(`rowvisit${visit.id}`);
    row.innerHTML = `
                <td>${visit.id}</td>
                <td>${visit.activityID}</td>
                <td>${visit.userID}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectvisit(${visit})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deletevisit(${visit})">Delete</button> 
                </td>`
}


async function Deletevisit(visit) {
    try {
        const response = await fetch(`/api/visits/${visit.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const visit = await response.json();

            DeleteTablevisit(visit);

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


function DeleteTablevisit(visit) {
    visits.splice(visits.indexOf(visit), 1);

    document.getElementById(`rowvisit${visit.id}`).remove();
}