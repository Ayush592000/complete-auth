const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONN
mongoose.connect(mongo_url)
  .then(() => {
    console.log("MongoDB connection sucessfully connected...")
  }).catch((err) => {
    console.log("MongoDB connection lost...", err)
  })