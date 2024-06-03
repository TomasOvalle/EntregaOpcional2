const template = (data) => `
    <div class="Container container-fluid ">
        <figure class="figure">
            <a href="../pages/details.html?id=${data._id}">
                <img style="width: 253px; height: 351px" class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            </a>
            <figcaption class="editorial figure-caption">${data.publisher}</figcaption>
            <figcaption class="titulo figure-caption">${data.title}</figcaption>
            <figcaption class="precio figure-caption">${data.price}</figcaption>
            <button type="button" class="btn btn-primary" onclick="addToCart('${data._id}')">Add to cart</button>
        </figure>
    </div>`;

async function fetchIndex(filter, limit = 12) {
    try {
        const query = location.search
        const params = new URLSearchParams(query)
        const page = params.get("page")
        console.log(page);
        let res = await fetch(`/api/products/paginate?title=${filter}&page=${page || 1}&limit=${limit}`);
        res = await res.json();
        console.log(res);
        const prev = document.querySelector("#prev")
        res.info.prevPage && (prev.innerHTML = `<a href='../pages/index.html?page=${res.info.prevPage}&limit=${limit}'>Previous page</a>`);
        const next = document.querySelector("#next")
        res.info.nextPage && (next.innerHTML = `<a href='../pages/index.html?page=${res.info.nextPage}&limit=${limit}'>Next page</a>`)
        const products = Array.isArray(res.response) ? res.response : [res.response];
        console.log(products);
        document.getElementById("products").innerHTML = products
            .map((each) => template(each))
            .join("")
    } catch (error) {
        console.log(error);
    }
}

fetchIndex();

async function addToCart(id) {
    try {
        let response = await fetch("/api/sessions/online");
        response = await response.json();
        if (response.statusCode === 200) {
            const data = {
                product_id: id,
                quantity: 1
            };
            const url = "/api/carts"
            const opts = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type" : "application/json"}
            };
            console.log(data);
            let response = await fetch(url, opts)
            response = await response.json()
            console.log(response);
            if (response.statusCode === 201) {
                Swal.fire({
                    title: "Done!",
                    icon: "success",
                    timer: 5000,
                    timerProgressBar: true,
                    confirmButtonColor: "#ff3b3c",
                });
            } else {
                Swal.fire({
                    title: "Please log in!",
                    iconColor: "white",
                    confirmButtonColor: "#ff3b3c",
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        } else {
            Swal.fire({
                title: "Please log in!",
                iconColor: "white",
                confirmButtonColor: "#ff3b3c",
                timer: 5000,
                timerProgressBar: true,
            });
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3b3c",
        });
    }
}



