const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AuthUsers = require('./routes/AuthUsers.routes');
const Productores = require('./routes/Productores.routes');
const Creditos = require('./routes/Creditos.routes');
const Stats = require('./routes/Stats.routes');
const Actions = require('./routes/Actions.routes');
const Tecnicos = require('./routes/Tecnicos.routes');
const Config = require('./routes/Config.routes');
const Municipio = require('./routes/Municipios.routes');
require('dotenv').config();

const app = express();

const frontend = process.env.FRONTEND_URL;

//* Middlewares

app.use(morgan('dev'));
app.use(cors({
    origin: frontend,
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//* Rutas

app.get('/', (req, res) => {
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
});

app.use(Municipio);
app.use(AuthUsers);
app.use(Productores);
app.use(Creditos);
app.use(Stats);
app.use(Actions);
app.use(Tecnicos);
app.use(Config);

//* Ejecución de puerto

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});