/* = getarticles() */;

var articles = [
    {
        id: 1,
        nameOfNews: "Обалдеть что!",
        description: "бубубу",
        text: "бубуб в 2 раза длиннее",
        photo: "",
    },
    {
        id: 2,
        nameOfNews: "Обалдеть что 2!",
        description: "бубубу",
        text: "бубуб в 2 раза длиннее",
        photo: "",
    }
]


document.getElementById("submit").addEventListener("click", () => {
    Addarticle();
    ClearForms();
})


articles.forEach(article => AddarticleToTable(article));


function AddarticleToTable(article) {
    if (!articles.some(art => art.id === article.id)) articles.push(article);

    document.getElementById("tableContext").innerHTML += `
    <tr id="rowarticle${article.id}">
        <td>${article.id}</td>
        <td>${article.nameOfNews}</td>
        <td>${article.description}</td>
        <td>${article.text}</td>
        <td>${article.photo}</td>
        <td> 
            <button class="btn btn-warning m-2" onclick="Selectarticle(${article})">Change</button> 
            <button class="btn btn-danger m-2" onclick="Deletearticle(${article})">Delete</button> 
        </td>
    </tr>`;
}


function Selectarticle(article) {
    document.getElementById("ID").value = article.id;
    document.getElementById("nameOfNews").value = article.nameOfNews;
    document.getElementById("description").value = article.description;
    document.getElementById("text").value = article.text;
    document.getElementById("photo").value = article.photo;
}


document.getElementById("update").addEventListener("click", () => {
    if (Updatearticle(articles[document.getElementById("ID").value])) {
        ClearForms();
    }
});


function ClearForms() {
    document.getElementById("ID").value = 0;
    document.getElementById("nameOfNews").value = 1;
    document.getElementById("description").value = "";
    document.getElementById("text").value = "";
    document.getElementById("photo").value = "";
}


async function Getarticles() {
    try {
        const response = await fetch(`https://localhost:7286/api/articles`);

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


async function Updatearticle(article) {
    try {
        const articleString = JSON.stringify(article);
        const response = await fetch(`/api/articles/${articleString}`, { method: "PUT" });

        if (response.ok === true) {
            const article = await response.json();

            UpdateTablearticle(article);

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


async function Addarticle(article) {
    try {
        const articleString = JSON.stringify(article);
        const response = await fetch(`/api/articles/${articleString}`, { method: "POST" });

        if (response.ok === true) {
            const article = await response.json();

            AddarticleToTable(article);

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


function UpdateTablearticle(article) {
    article.nameOfNews = document.getElementById("nameOfNews").value;
    article.description = document.getElementById("description").value;
    article.text = document.getElementById("text").value;
    article.photo = document.getElementById("photo").value;


    let row = document.getElementById(`rowarticle${article.id}`);
    row.innerHTML = `
                <td>${article.id}</td>
                <td>${article.nameOfNews}</td>
                <td>${article.description}</td>
                <td>${article.text}</td>
                <td>${article.photo}</td>
                <td> 
                    <button class="btn btn-warning m-2" onclick="Selectarticle(${article})">Change</button> 
                    <button class="btn btn-danger m-2" onclick="Deletearticle(${article})">Delete</button> 
                </td>`
}


async function Deletearticle(article) {
    try {
        const response = await fetch(`/api/articles/${article.id}`, { method: "DELETE" });

        if (response.ok === true) {
            const article = await response.json();

            DeleteTablearticle(article);

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


function DeleteTablearticle(article) {
    articles.splice(articles.indexOf(article), 1);

    document.getElementById(`rowarticle${article.id}`).remove();
}