import CustomRouter from "../CustomRouter.js";
import cartsRouter from "./cart.api.js";
import usersRouter from "./user.api.js";
import productsRouter from "./products.api.js";
//import ticketsRouter from "./tickets.api.js";
import sessionsRouter from "./sessions.api.js";

class ApiRouter extends CustomRouter {
    init() {
        this.use("/carts", cartsRouter);
        this.use("/users", usersRouter);
        this.use("/products", productsRouter);
        this.use("/sessions", sessionsRouter);
    }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();