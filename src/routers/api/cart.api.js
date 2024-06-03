import CustomRouter from "../CustomRouter.js";
import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";

class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["USER"], create);
        this.read("/", ["USER"], read);
        this.read("/:uid", ["USER"], readOne);
        this.update("/:uid", ["USER"], update);
        this.destroy("/:uid", ["USER"], destroy);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();


async function read(req, res, next) {
    try {
        const user_id = req.user._id;
        const all = await cartsManager.read({ user_id });
        if (all.length > 0) {
            return res.response200(all);
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
}

async function create (req, res, next) {
    try {
        const data = req.body;
        data.user_id = req.user._id;
        const one = await cartsManager.create(data);
        return res.message201("CREATED ID: " + one.id);
    } catch (error) {
        return next(error)
    }
}

async function update (req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await cartsManager.update(uid, data)
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
        } catch (error) {
            return next(error);
        }
}

async function destroy (req, res, next) {
    try {
        const { uid } = req.params
        const one = await cartsManager.destroy(uid)
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next (error)
    }
}

async function readOne(res, req, next) {
    try {
        const { uid } = req.params;
        const one =  await cartsManager.readOne(uid);
        if (one) {
            return res.response200(one);
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next (error)
    }
};

