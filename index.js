import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectDb from './db/config.js'
import authRouter from './routes/auth.js'
import categoryRouter from './routes/category.js'
import { v2 } from 'cloudinary';
dotenv.config()

// database
connectDb()
const PORT =process.env.PORT || 8000 
const app = express();
app.use(cors())
app.use(express.json())

// cloud
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/ping',(req,res)=>{
    res.status(200).send('<h1>Pong</h1>  {{ Welcome shreejishoesandmansware - API }}')
})

app.use('/api/v1/user',authRouter)
app.use('/api/v1/category',categoryRouter)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})