const mongoose = require('mongoose');
require('dotenv').config();

const urlConnect = process.env.MONGO_CONNECT

const dbConnection = async () => {

    try {
        await mongoose.connect(urlConnect);
        console.log("Base de datos online")
    } catch (error) {
        console.error('Error al conectar con la base de datos')
    }

}


module.exports = dbConnection;