const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));

app.get('/crear', (req, res) => {
    console.log(req.query)
    res.send('Todo Ok')
})

app.listen(3000, function(){
    console.log('Servidor ejecutando')
});