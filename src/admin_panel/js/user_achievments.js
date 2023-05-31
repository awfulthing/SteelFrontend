/* = getwhosAchiewments() */;

var whosAchiewments = [
    {
        id: 1,
        userID: 1,
        achievmentID: 1,
    },
    {
        id: 2,
        userID: 2,
        achievmentID: 2,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    AddwhosAchiewment();
    ClearForms();
})


whosAchiewments.forEach(whosAchiewment => AddwhosAchiewmentToTable(whosAchiewment));


function AddwhosAchiewmentToTable(whosAchiewment) {
    if (!whosAchiewments.some(who => who.id === whosAchiewment.id)) whosAchiewments.push(whosAchiewment);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowwhosAchiewment${whosAchiewment.id}">
        <td>${whosAchiewment.id}</td>
        <td>${whosAchiewment.userID}</td>
        <td>${whosAchiewment.achievmentID}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="SelectwhosAchiewment(${whosAchiewment})">Change</button> 
            <button class="btn btn-danger m-2" onclick="DeletewhosAchiewment(${whosAchiewment})">Delete</button> 
        </td>
    </tr>`;
}


function SelectwhosAchiewment(whosAchiewment) {
    document.getElementById("ID").value = whosAchiewment.id;
    document.getElementById("userID").value = whosAchiewment.userID;
    document.getElementById("achievmentID").value = whosAchiewment.achievmentID;
}


document.getElementById("update").addEventListener("click", () => {
    if (UpdatewhosAchiewment(whosAchiewments[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("userID").value = "";
    document.getElementById("achievmentID").value = 1;
}


async function GetwhosAchiewments() {
    try {
        const response = await fetch(`https://localhost:7286/api/whosAchiewments`);

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


async function UpdatewhosAchiewment(whosAchiewment) {
    try {
        const whosAchiewmentString = JSON.stringify(whosAchiewment);
        const response = await fetch(`/api/whosAchiewments/${whosAchiewmentString}`, { method: "PUT" });

        if (response.ok === true) {
            const whosAchiewment = await response.json();

            UpdateTablewhosAchiewment(whosAchiewment);

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


async function AddwhosAchiewment(whosAchiewment) {
    try {
        const whosAchiewmentString = JSON.stringify(whosAchiewment);
        const response = await fetch(`/api/whosAchiewments/${whosAchiewmentString}`, { method: "POST" });

        if (response.ok === true) {
            const whosAchiewment = await response.json();

            AddwhosAchiewmentToTable(whosAchiewment);

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


function UpdateTablewhosAchiewment(whosAchiewment) {
    whosAchiewment.userID = document.getElementById("userID").value;
    whosAchiewment.achievmentID = document.getElementById("achievmentID").value;


    let row = document.getElementById(`rowwhosAchiewment${whosAchiewment.id}`);
    row.innerHTML = `
                <td>${whosAchiewment.id}</td>
                <td>${whosAchiewment.userID}</td>
                <td>${whosAchiewment.achievmentID}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="SelectwhosAchiewment(${whosAchiewment})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="DeletewhosAchiewment(${whosAchiewment})">Delete</button> 
                </td>`
}


async function DeletewhosAchiewment(whosAchiewment) {
    try {
        const response = await fetch(`/api/whosAchiewments/${whosAchiewment.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const whosAchiewment = await response.json();

            DeleteTablewhosAchiewment(whosAchiewment);

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


function DeleteTablewhosAchiewment(whosAchiewment) {
    whosAchiewments.splice(whosAchiewments.indexOf(whosAchiewment), 1);

    document.getElementById(`rowwhosAchiewment${whosAchiewment.id}`).remove();
}