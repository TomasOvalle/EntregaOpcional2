class UserManager {
    static #users = [];

    create(data) {
        try {
            const user = {
                id:
                    UserManager.#users.length === 0
                        ? 1
                        : UserManager.#users[UserManager.#users.length - 1].id +1,
                photo: data.photo,
                email: data.email,
                password: data.password,
                role: data.role || "peón"
            };
            if (!data.email) {
                throw new Error("Ingrese un email");
            } else {
                UserManager.#users.push(user);
                console.log("Se ha creado un usuario");
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (UserManager.#users.length === 0) {
                throw new Error("No hay usuarios");
            } else {
                return UserManager.#users
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const ichi = UserManager.#users.find((each) => each.id === id);
            if (!ichi) {
                throw new Error("No existe el usuario")
            } else {
                return ichi;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id) {
        try {
                const elimimar = UserManager.#users.filter((each) => each.id !== id);
                UserManager.#users = elimimar;
                console.log("Usuario eliminado");
            
        } catch (error) {
            console.log(error);
        }
    }
}

/*const usuarios = new UserManager

usuarios.create({
    photo: "photo1.jpg",
    email: "email1@email.com",
    password: "password1",
    role: "torre"
})

usuarios.create({
    photo: "photo2.jpg",
    email: "email2@email.com",
    password: "password2",
    role: "alfil"
})

usuarios.create({
    photo: "photo3.jpg",
    email: "email3@email.com",
    password: "password3"
})

usuarios.create({
    photo: "photo4.jpg",
    email: "email4@email.com",
    password: "password4",
    role: "torre"
})

console.log(usuarios.read());
console.log(usuarios.readOne(2));
console.log(usuarios.readOne(6));
console.log(usuarios.destroy(4));
console.log(usuarios.destroy(9)); */