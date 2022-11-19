import Product from "../models/productModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

//GET ALL
const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

//GET ONE
const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find product" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: "Can't find product" });
  }
  res.status(200).json(product);
};
//CREATE ONE
const createProduct = async (req: Request, res: Response) => {
  console.log(123)
  console.log(req.body)
  console.log(Product)
  const { title, price, img } = req.body;
  try {
    const product = await Product.create({ title, price, img });
    console.log(product)
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
//DELETE ONE
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id)
    return res.status(404).json({ error: "Can't find product0" });
  }

  const product = await Product.findOneAndDelete({_id:id})

  if (!product) {
    return res.status(404).json({ error: "Can't find product" });
  }
  res.status(200).json(product)
};
//UPDATE ONE
const updateProduct = async(req:Request, res: Response)=>{
  const { id } = req.params;

  const product = await Product.findOneAndUpdate({_id: id},{...req.body} )
  if (!product) {
    return res.status(404).json({ error: "Can't find product" });
  }
  res.status(200).json(product)
}



export const productController = { createProduct, getProducts, getProduct, deleteProduct, updateProduct };
