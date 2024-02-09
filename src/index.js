const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AuthUsers = require('./routes/AuthUsers.routes');
const Productores = require('./routes/Productores.routes');
const Creditos = require('./routes/Creditos.routes');
require('dotenv').config();

const app = express();

const frontend = process.env.FRONTEND_URL;

//* Middlewares

app.use(morgan('dev'));
app.use(cors({
    origin: frontend, // Asegúrate de que esto coincida con el dominio de tu cliente
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//* Rutas

app.get('/', (req, res) => {
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
});

app.use(AuthUsers);
app.use(Productores);
app.use(Creditos);

//* Ejecución de puerto

const port = process.env.SERVER_PORT || 3000; // Añadido un puerto por defecto por si acaso

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});