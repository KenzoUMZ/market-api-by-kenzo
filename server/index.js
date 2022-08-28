// config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const marketRoute = require('./routes/marketRoutes')
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const listRoute = require('./routes/listRoutes')
const productTypeRoute = require('./routes/productTypeRoutes')
require('dotenv').config();



app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

marketRoute(app)
productRoute(app)
userRoute(app)
listRoute(app)
productTypeRoute(app)

const port = process.env.PORT || 3000;

mongoose
    .connect(
       process.env.MONGO_URI,
    )
    .then(() => {
        console.log('Database Connected!')
        app.listen(port)
    })
    .catch((err) => console.log(err))
