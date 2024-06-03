document.querySelector("#register").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };

    const photo = document.querySelector("#photo").value;
    const age = document.querySelector("#age").value;

    if (photo) {
        data.photo = photo;
    }
    if (age) {
        data.age = age;
    }

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    console.log(data);
    try {
        let response = await fetch("/api/sessions/register", opts);
        response = await response.json();
        console.log(response);

        if (response.statusCode === 201) {
            Swal.fire({
                title: response.message,
                icon: "success",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3b3c",
            });
            return location.replace("/login.html");
        } else {
            Swal.fire({
                title: response.message,
                icon: "error",
                timer: 5000,
                timerProgressBar: true,
                confirmButtonColor: "#ff3bc"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            confirmButtonColor: "#ff3bc"
        });
    }
});