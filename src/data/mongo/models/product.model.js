import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema ( {
    product_id: { type: Types.ObjectId, ref: "products", required: true, index: true},
    title: { type: String, required: true, index: true},
    photo: { type: String, default: "https://i.postimg.cc/wTgNFWhR/profile.png"},
    category: { type: String, default: "manga"},
    price: { type: Number, default: 1},
    stock: { type: Number, default: 1},
}, 
{
    timestamps: true,
}
);

schema.plugin(mongoosePaginate);

//schema.pre("find", function() { this.populate("product_id", "title")});
//schema.pre("findOne", function() { this.populate("product_id")});

const Product = model(collection, schema);
export default Product;