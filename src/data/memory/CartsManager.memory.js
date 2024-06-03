class CartsManager {
    static amount = 0;
    static #carts = [];

    create(data) {
        try {
            const cart = {
                product_id: CartsManager.amount === 0
                    ? 1
                    : CartsManager.#carts[CartsManager.amount - 1].product_id + 1,
                user_id: data.user_id,
                quantity: data.quantity,
                state: data.state
            };
            if (!data.product_id) {
                throw new Error('the shopping cart is empty')
            } else {
                CartsManager.#carts.push(cart) && CartsManager.amount++;
                console.log('Se a registrado un producto en el carrito');
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (CartsManager.#carts.length === 0) {
                throw new Error ('The shoping cart is empty')
            } else {
                return CartsManager.#carts
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(product_id) {
        try {
            const one = CartsManager.#carts.find((each) => each.product_id === product_id);
            if (!one) {
                throw new Error('No existe el producto en el carrito')
            } else {
                return one
            }
        } catch (error) {
            console.log(error);
        }
    }

    destroy(product_id) {
        try {
            const deleteProductCart = CartsManager.#carts.filter((each) => each.product_id !== product_id);
            CartsManager.#carts = deleteProductCart
            console.log('Se ha eliminado el producto del carrito');
        } catch (error) {
            console.log(error);
        }
    }

    update(product_id, newData) {
        try {
            const index = CartsManager.#carts.findIndex((cart) => cart.product_id === product_id);
            if (index === -1) {
                throw new Error('No existe el producto en el carrito');
            } else {
                CartsManager.#carts[index] = { ...CartsManager.#carts[index], ...newData };
                console.log('Se ha actualizado el producto del carrito');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const cartsManager = new CartsManager();

/*function test() {
    const cartsManager = new CartsManager();

    // Crear un carrito y agregar productos
    cartsManager.create({ product_id: 1, user_id: 1, quantity: 2, state: 'reserved' });
    cartsManager.create({ product_id: 2, user_id: 1, quantity: 1, state: 'delivered' });

    // Leer el carrito
    console.log("Carrito:");
    console.log(cartsManager.read());

    // Leer un producto específico
    console.log("Producto con ID 2:");
    console.log(cartsManager.readOne(2));

    // Actualizar un producto
    console.log("Actualizando producto con ID 1:");
    cartsManager.update(1, { quantity: 3 });
    console.log(cartsManager.readOne(1));

    // Eliminar un producto
    console.log("Eliminando producto con ID 2:");
    cartsManager.destroy(2);
    console.log("Carrito después de eliminar el producto:");
    console.log(cartsManager.read());
}

// Ejecutar la función de prueba
test();*/


