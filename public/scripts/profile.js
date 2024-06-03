/*console.log(location);
const queries = new URL(location.href)
const uid = queries.searchParams.get("id")
console.log(uid);*/

const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            <figcaption class="editorial figure-caption">${data.email}</figcaption>
            <figcaption class="titulo figure-caption">${data.age}</figcaption>
        </figure>
    </div>`;

/*    async function fetchProfile() {
        try {
            let res = await fetch("/api/users/"+uid);
            res = await res.json();
            console.log(res);
            const users = Array.isArray(res.response) ? res.response : [res.response];
            console.log(users);
            document.getElementById("profile").innerHTML = users
                .map((each) => template(each))
                .join("")
        } catch (error) {
            console.log(error);
        }
    };

fetchProfile()*/

async function fetchProfile() {
    try {
        let response = await fetch("/api/sessions/online");
        
        if (response.status === 401) {
            console.log("Usuario no está online");
            location.replace("/pages/login.html");
            return;
        }

        response = await response.json();

        if (response.user_id) {
            const user_id = response.user_id;
            let usersResponse = await fetch("/api/users?user_id=" + user_id);
            if (!usersResponse.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            let users = await usersResponse.json();
            users = users.response;
            if (users && users.length > 0) {
                document.getElementById("profile").innerHTML = users.map((each) => template(each)).join("");
            }
            console.log(response);
            console.log(users);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchProfile();
