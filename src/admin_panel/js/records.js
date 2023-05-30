/* = getrecords() */;

var records = [
    {
        id: 1,
        classID: 1,
        userID: 1,
    },
    {
        id: 2,
        classID: 2,
        userID: 2,
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addrecord();
    ClearForms();
})


records.forEach(record => AddrecordToTable(record));


function AddrecordToTable(record) {
    records.push(record);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowrecord${record.id}">
        <td>${record.id}</td>
        <td>${record.classID}</td>
        <td>${record.userID}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectrecord(${record})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleterecord(${record})">Delete</button> 
        </td>
    </tr>`;
}


function Selectrecord(record) {
    document.getElementById("ID").value = record.id;
    document.getElementById("classID").value = record.classID;
    document.getElementById("userID").value = record.userID;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updaterecord(records[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("classID").value = 1;
    document.getElementById("userID").value = "";
}


async function Getrecords() {
    try {
        const response = await fetch(`https://localhost:7286/api/records`);

        if (response.ok === true) {
            records = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}


async function Updaterecord(record) {
    try {
        const recordString = JSON.stringify(record);
        const response = await fetch(`/api/records/${recordString}`, { method: "PUT" });

        if (response.ok === true) {
            const record = await response.json();

            UpdateTablerecord(record);

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


async function Addrecord(record) {
    try {
        const recordString = JSON.stringify(record);
        const response = await fetch(`/api/records/${recordString}`, { method: "POST" });

        if (response.ok === true) {
            const record = await response.json();

            AddrecordToTable(record);

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


function UpdateTablerecord(record) {
    record.classID = document.getElementById("classID").value;
    record.userID = document.getElementById("userID").value;


    let row = document.getElementById(`rowrecord${record.id}`);
    row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.classID}</td>
                <td>${record.userID}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectrecord(${record})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deleterecord(${record})">Delete</button> 
                </td>`
}


async function Deleterecord(record) {
    try {
        const response = await fetch(`/api/records/${record.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const record = await response.json();

            DeleteTablerecord(record);

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


function DeleteTablerecord(record) {
    records.splice(records.indexOf(record), 1);

    document.getElementById(`rowrecord${record.id}`).remove();
}