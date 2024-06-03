class ProductsManager {
    static quantity = 0;
    static #products = [];

    create(data) {
        try {
            const product = {
                id: 
                    ProductsManager.quantity === 0
                        ? 1 
                        : ProductsManager.#products[ProductsManager.quantity - 1].id + 1,
                title: data.title,
                photo: data.photo,
                category: data.category,
                price: data.price,
                stock: data.stock,
            };
            if (!data.title) {
                throw new Error("Ingrese un producto")
            } else {
                ProductsManager.#products.push(product) && ProductsManager.quantity++; 
                console.log("Se ha ingresa un producto");
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (ProductsManager.#products.length === 0){
                throw new Error("No hay productos")
            } else {
                return ProductsManager.#products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const uno = ProductsManager.#products.find((each) => each.id === id);
            if (!uno) {
                throw new Error("No existe el producto");
            } else {
                return uno;
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(id) {
        try {
            const borrar = ProductsManager.#products.filter((each) => each.id !== id);
            ProductsManager.#products = borrar
            console.log("Producto eliminado");
        } catch (error) {
            console.log(error);
        }
    }
}

/*const products = new ProductsManager(); 

products.create({
    title: "Producto 1",
    photo: "path/to/photo1.jpg",
    category: "Categoria 1",
    price: 100,
    stock: 5
})

products.create({
    title: "Producto 2",
    photo: "path/to/photo2.jpg",
    category: "Categoria 2",
    price: 200,
    stock: 10
})


products.create({
    title: "Producto 3",
    photo: "path/to/photo3.jpg",
    category: "Categoria 3",
    price: 300,
    stock: 15
})


console.log(products.read());
console.log(products.readOne(2));
console.log(products.readOne(12));
console.log(products.destroy(3));
console.log(products.destroy(15)); */