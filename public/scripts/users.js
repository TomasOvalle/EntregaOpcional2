const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <a href="../pages/profile.html?id=${data._id}">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            </a>
            <figcaption class="editorial figure-caption">${data.email}</figcaption>
            <figcaption class="titulo figure-caption">${data.age}</figcaption>
        </figure>
    </div>`;

    async function fetchUsers() {
        try {
            let res = await fetch("/api/users");
            res = await res.json();
            console.log(res);
            const users = Array.isArray(res.response) ? res.response : [res.response];
            console.log(users);
            document.getElementById("users").innerHTML = users
                .map((each) => template(each))
                .join("")
        } catch (error) {
            console.log(error);
        }
    };

fetchUsers();

