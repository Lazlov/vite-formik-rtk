import { Schema, model, InferSchemaType } from "mongoose";

interface IProduct {

    title: string;
    price: string;
    img?: string;
    // _id?:string;
    // _id?:{ type: Schema.Types.ObjectId };
  }

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: false },
  // _id: String

}, {timestamps: true});

const Product= model('Product', productSchema);

export default Product


