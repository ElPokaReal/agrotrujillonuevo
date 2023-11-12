const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
require('dotenv').config();

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Visor setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Rutas
app.get('/casa', (req, res) =>{
    res.render('index')
})

app.get('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
})

//Ejecución de puerto
const port = process.env.SERVER_PORT;

app.listen(port)

console.log(`Servidor en puerto ${port}`)

