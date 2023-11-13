const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const AuthUsers = require('./routes/AuthUsers.routes');
const { checkUser } = require('./middlewares/AuthMiddleware');
require('dotenv').config();

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Visor setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Rutas
app.get('*', checkUser)

app.get('/casa', (req, res) =>{
    res.render('index')
})

app.use(AuthUsers)

app.get('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
})

//Ejecución de puerto
const port = process.env.SERVER_PORT;

app.listen(port)

console.log(`Servidor en puerto ${port}`)

