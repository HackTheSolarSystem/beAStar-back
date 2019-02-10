const express = require('express');
const app = express();

var mongo = require('mongodb');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/:color', (req, res) => res.send('Hello World!'))

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))