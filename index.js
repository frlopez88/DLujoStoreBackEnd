const express = require('express');
const app = express();
app.use(express.json());

const estado = require('./routes/estado');
app.use('/api/estado', estado);

const rol = require('./routes/rol');
app.use('/api/rol', rol);



app.listen(3000);