const express = require('express');
const app = express();
app.use(express.json());


const cliente = require('./routes/cliente');
app.use('/api/cliente', cliente);


app.listen(3000);