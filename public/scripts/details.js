console.log(location);
const queries = new URL(location.href)
const pid = queries.searchParams.get("id")
console.log(pid);

const template = (data) => `
    <div class="container-bakemonogatari">
        <div class="div1"> 
            <figure class="Bakemonogatari">
            <img class="img-fluid rounded" src="${data.photo}" alt="${data._id}" />
            </figure>
        </div>
        <div class="div2"> 
            <h1>${data.title}</h1>
            <h2>${data.price}</h2>
        </div>
        <div class="div3">
            <div class="d-grid gap-2 col-6">
            <button type="button" class="btn" onclick="addToCart('${data._id}')">Add to cart</button>
            </div>
        </div>
        <div class="div4"> 
            <p><strong>Publisher:</strong> ${data.publisher}</p>
            <p><strong>Category:</strong> ${data.category}</p>
        </div>
        <div class="div5"> 
            <h3>Sinopsis:</h3>
            <figcaption class="figure-caption"></figcaption>
        </div>
    </div>`;

async function fetchDetails() {
    try {
        let res = await fetch("/api/products/"+pid);
        res = await res.json();
        console.log(res);
        const product = Array.isArray(res.response) ? res.response : [res.response];
        console.log(product);
        document.getElementById("details").innerHTML = product
            .map((each) => template(each))
            .join("")
    } catch (error) {
        console.log(error);
    }
}

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

fetchDetails();

