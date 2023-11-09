const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) =>{
    res.json({message: 'Bienvenido a la API de Agrotrujillo'})
})



app.listen('3000')
console.log('Servidor en puerto 3000')

