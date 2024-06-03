async function printConditions() {
    try {
        let template = "";
        let online = await fetch("/api/sessions/online", { credentials: 'include' });
        online = await online.json();
        if (online.statusCode === 200) {
            template = `
                <button class="btn" class="signOut-button" id="SignOut">Sign Out!</button>
                    <a href="./carts.html">
                        <input class="btn" type="button" value="Cart">
                    </a>`;
                document.querySelector("#conditions").innerHTML = template;
                document.querySelector("#SignOut").addEventListener("click", async () => {
                    const opts = {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                    };
                    let response = await fetch("/api/sessions/signout", opts);
                    response = await response.json();
                    console.log(response);
                    if (response.statusCode === 200) {
                        location.replace("/pages/index.html")
                    }
                })
        } else {
            template = `<a href="./login.html">
                            <input class="btn" type="button" name="Login" value="Login">
                        </a>`
            document.querySelector("#conditions").innerHTML = template;
        }
    } catch (error) {
        console.log(error);
    }
}

printConditions();