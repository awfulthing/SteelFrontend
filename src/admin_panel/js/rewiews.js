/* = getrewiews() */;

var rewiews = [
    {
        id: 1,
        trainerID: 1,
        userID: 1,
        text: "бубубу",
        grade: 5,
    },
    {
        id: 2,
        trainerID: 2,
        userID: 2,
        text: "бубубу",
        grade: 4,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addrewiew();
    ClearForms();
})


rewiews.forEach(rewiew => AddrewiewToTable(rewiew));


function AddrewiewToTable(rewiew) {
    rewiews.push(rewiew);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowrewiew${rewiew.id}">
        <td>${rewiew.id}</td>
        <td>${rewiew.trainerID}</td>
        <td>${rewiew.userID}</td>
        <td>${rewiew.text}</td>
        <td>${rewiew.grade}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectrewiew(${rewiew})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleterewiew(${rewiew})">Delete</button> 
        </td>
    </tr>`;
}


function Selectrewiew(rewiew) {
    document.getElementById("ID").value = rewiew.id;
    document.getElementById("trainerID").value = rewiew.trainerID;
    document.getElementById("userID").value = rewiew.userID;
    document.getElementById("text").value = rewiew.text;
    document.getElementById("grade").value = rewiew.grade;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updaterewiew(rewiews[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("trainerID").value = 1;
    document.getElementById("userID").value = "";
    document.getElementById("text").value = "";
    document.getElementById("grade").value = "";
}


async function Getrewiews() {
    try {
        const response = await fetch(`https://localhost:7286/api/rewiews`);

        if (response.ok === true) {
            rewiews = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}


async function Updaterewiew(rewiew) {
    try {
        const rewiewString = JSON.stringify(rewiew);
        const response = await fetch(`/api/rewiews/${rewiewString}`, { method: "PUT" });

        if (response.ok === true) {
            const rewiew = await response.json();

            UpdateTablerewiew(rewiew);

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


async function Addrewiew(rewiew) {
    try {
        const rewiewString = JSON.stringify(rewiew);
        const response = await fetch(`/api/rewiews/${rewiewString}`, { method: "POST" });

        if (response.ok === true) {
            const rewiew = await response.json();

            AddrewiewToTable(rewiew);

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


function UpdateTablerewiew(rewiew) {
    rewiew.trainerID = document.getElementById("trainerID").value;
    rewiew.userID = document.getElementById("userID").value;
    rewiew.userID = document.getElementById("text").value;
    rewiew.userID = document.getElementById("grade").value;


    let row = document.getElementById(`rowrewiew${rewiew.id}`);
    row.innerHTML = `
                <td>${rewiew.id}</td>
                <td>${rewiew.trainerID}</td>
                <td>${rewiew.userID}</td>
                <td>${rewiew.text}</td>
                <td>${rewiew.grade}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectrewiew(${rewiew})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deleterewiew(${rewiew})">Delete</button> 
                </td>`
}


async function Deleterewiew(rewiew) {
    try {
        const response = await fetch(`/api/rewiews/${rewiew.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const rewiew = await response.json();

            DeleteTablerewiew(rewiew);

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


function DeleteTablerewiew(rewiew) {
    rewiews.splice(rewiews.indexOf(rewiew), 1);

    document.getElementById(`rowrewiew${rewiew.id}`).remove();
}