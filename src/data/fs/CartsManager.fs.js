import fs from 'fs';
import crypto from "crypto"

class CartsManager {
    constructor() {
        this.path = "./src/data/fs/files/carts.json";
        this.init();
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Cart received");
        } else {
            console.log("this cart already exists");
        }
    }

    async create(data) {
        try {
            if (!data.quantity) {
                throw new Error("Enter a user")
            } else {
                const cart = {
                    user_id: crypto.randomBytes(12).toString("hex"),
                    product_id: crypto.randomBytes(12).toString("hex"),
                    quantity: data.quantity || 1,
                    state: data.state || "reserved"
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(cart);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({created: cart});
                return cart
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }

    async read() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            if (all.length === 0) {
                throw new Error ("No existen carritos")
            } else {
                console.log(all);
                return all
            }
        } catch (error) {
            throw error
        }
    }

    async readOne(user_id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let cart = all.find((each) => each.user_id === user_id);
            if (!cart) {
                throw new Error("Usuario no encontrado")
            } else {
                console.log(cart);
                return cart;
            }
        } catch (error) {
            throw error
        }
    }

    async destroy(user_id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let cart = all.find((each) => each.user_id === user_id);
            if (!cart) {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error
            } else {
                let filtered = all.filter((each) => each.user_id !== user_id);
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered);
                console.log({ deleted: user_id });
                return cart;
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update (user_id, data) {
        try {
            let all = await this.read();
            let one = all.find(each => each.user_id === user_id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                return one;
            } else {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error
            }
        } catch (error) {
            throw error
        }
    }
}

const cartsManager = new CartsManager();
export default cartsManager;

async function test() {
    try {
        const cart = new CartsManager();

        /*await cart.create({
            quantity: 15,
            state: "reserved"
        })

        await cart.create({
            quantity: 7,
            state: "delivered"
        })*/

        await cartsManager.read();
        //await cartsManager.readOne('');
        //await cartsManager.destroy("824b22e888fbb82d17e19fa0");
        await cartsManager.update("83ec3d0ed34290624f87efc8", { quantity: 3});
        await cartsManager.read()

    } catch (error) {
        console.error(error);
    }
}

test();
