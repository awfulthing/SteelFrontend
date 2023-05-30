/* = getroles() */;

var roles = [
    {
        id: 1,
        nameOfRole: "Пользователь",
    },
    {
        id: 2,
        nameOfRole: "Преподаватель",
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addrole();
    ClearForms();
})


roles.forEach(role => AddroleToTable(role));


function AddroleToTable(role) {
    roles.push(role);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowrole${role.id}">
        <td>${role.id}</td>
        <td>${role.nameOfRole}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectrole(${role})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deleterole(${role})">Delete</button> 
        </td>
    </tr>`;
}


function Selectrole(role) {
    document.getElementById("ID").value = role.id;
    document.getElementById("nameOfRole").value = role.nameOfRole;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updaterole(roles[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("nameOfRole").value = 1;
}


async function Getroles() {
    try {
        const response = await fetch(`https://localhost:7286/api/roles`);

        if (response.ok === true) {
            roles = await response.json();
        } else {
            const error = await response.json();
            console.log(error.message);
        }
    } catch (error) {
        console.log(error);
    }
}


async function Updaterole(role) {
    try {
        const roleString = JSON.stringify(role);
        const response = await fetch(`/api/roles/${roleString}`, { method: "PUT" });

        if (response.ok === true) {
            const role = await response.json();

            UpdateTablerole(role);

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


async function Addrole(role) {
    try {
        const roleString = JSON.stringify(role);
        const response = await fetch(`/api/roles/${roleString}`, { method: "POST" });

        if (response.ok === true) {
            const role = await response.json();

            AddroleToTable(role);

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


function UpdateTablerole(role) {
    role.nameOfRole = document.getElementById("nameOfRole").value;

    let row = document.getElementById(`rowrole${role.id}`);
    row.innerHTML = `
                <td>${role.id}</td>
                <td>${role.nameOfRole}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectrole(${role})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deleterole(${role})">Delete</button> 
                </td>`
}


async function Deleterole(role) {
    try {
        const response = await fetch(`/api/roles/${role.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const role = await response.json();

            DeleteTablerole(role);

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


function DeleteTablerole(role) {
    roles.splice(roles.indexOf(role), 1);

    document.getElementById(`rowrole${role.id}`).remove();
}