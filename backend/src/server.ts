import express from 'express';
import dotenv from 'dotenv';
import productsRouter from "./routes/products"
import authRouter from "./routes/auth"
import usersRouter from "./routes/users"
import mongoose from "mongoose"
import cors from "cors"
import cookieParcer from "cookie-parser"


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParcer())

// app.use(cors())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',

}));

app.use("/api", authRouter)
app.use("/api/products/", productsRouter)
app.use("/api/users/", usersRouter)

app.all('*', (req, res) => {
  res.status(404).send('<h1>Page not found</h1>');
});

const db = process.env.MONGO_URI;


mongoose.connect(`${db}`)
.then(()=>{
  app.listen(port, () => {
    console.log(`[server]: Db is running at https://localhost:${port}`);
    
  });
})
.catch(error=>console.log(error))


