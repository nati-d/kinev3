const express = require('express')
require('dotenv').config()
const app = express()
const connectDB = require('./db/connection')
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/category')
const cors = require('cors')





const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/category", categoryRoutes)

const start = async() => {
    try {
        await connectDB(MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`Server is listening to ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }

}

start()
