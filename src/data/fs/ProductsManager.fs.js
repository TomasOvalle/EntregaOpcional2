import fs from "fs";
import crypto from "crypto";

class ProductsManager {
    constructor() {
        this.path = "./src/data/fs/files/products.json";
        this.init();
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Product received");
        } else {
            console.log("This product already exists");
        }
    }

    async create(data) {
        try {
            if (!data.title) {
                throw new Error("Enter product")
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    publisher: data.publisher || "publisher",
                    photo: data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png",
                    category: data.category || "manga",
                    price: data.price || 1,
                    stock: data.stock || 1
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(product);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({created: product.id});
                return product;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

async read(cat) {
    try {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        cat && (all = all.filter((each) => each.category === cat));
        return all;
    } catch (error) {
        throw error;
    }
}

async readOne(id) {
    try {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        let product = all.find((each) => each.id === id);
        return product;
    } catch (error) {
        throw error;
    }
}

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (product) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered);
                console.log({deleted: product.id});
                return product;
            } else {
                const error = new Error("Not found");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async update (id, data) {
        try {
            let all = await this.read();
            let one = all.find(each => each.id === id);
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

const productsManager = new ProductsManager()
export default productsManager

