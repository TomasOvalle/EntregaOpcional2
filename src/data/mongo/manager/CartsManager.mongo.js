import Manager from '../Manager.mongo.js'
import Cart from '../models/cart.model.js'

const cartsManager = new Manager(Cart)
export default cartsManager;