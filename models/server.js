const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/database');

class Server {
    constructor(){

        this.app = express();
        this.puerto = process.env.PORT;

        this.conectarDB();

        this.middlewares();

        this.routes();

    }

    
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //cors
        this.app.use(cors());
        //Permite leer formato json
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/', require('../routes/usuarios.routes'));
        this.app.use('/', require('../routes/auth.routes'));
        this.app.use('/', require('../routes/cursos.routes'));
    }

    listen(){
        this.app.listen(this.puerto, ()=>{
            console.log('Corriendo en el puerto', this.puerto)
        })
    }
}

module.exports = Server