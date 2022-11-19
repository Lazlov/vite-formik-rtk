import express from "express";
import {productController} from "../controllers/productController";




const router = express.Router();

const { getProducts, getProduct, createProduct, deleteProduct, updateProduct } =
  productController;

//GET all 
router.get("/", getProducts);
//GET one
router.get("/:id", getProduct);
//DELETE one
router.delete("/:id", deleteProduct);
//UPDATE one
router.patch("/:id", updateProduct);
//POST one
router.post("/", createProduct);


export default router;
