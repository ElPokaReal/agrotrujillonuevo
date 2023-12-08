const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const AuthUsers = require('./routes/AuthUsers.routes');
const Productores = require('./routes/Productores.routes');
const Creditos = require('./routes/Creditos.routes');
require('dotenv').config();

const app = express();

//* Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//* Rutas
//TODO: Agregar las rutas faltantes

app.get('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
});

app.use(AuthUsers);
app.use(Productores);
app.use(Creditos);


//* Ejecución de puerto

const port = process.env.SERVER_PORT;

app.listen(port)

console.log(`Servidor en puerto ${port}`)

