const express = require('express')
require('dotenv').config();
require('./models/db')
const bodyParser = require('body-parser')
const authRouter = require('./routes/authRouter')
const productRouter = require('./routes/productRouter')
const cors = require('cors')
const PORT = process.env.PORT;
const app = express()

app.use(bodyParser.json());
app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/products', productRouter)

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`)
})