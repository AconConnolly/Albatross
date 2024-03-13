const mongoose = require("mongoose")

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })

    console.log(`Mongodb connection successful: ${connection.connection.host}`)
}

module.exports = connectDB
