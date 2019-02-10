const express = require('express');
const app = express();

// var mongo = require('mongodb');
//mongodb://heroku_kvdqb8k0:7piN5DpFHB4BG2v@ds129085.mlab.com:29085/heroku_kvdqb8k0
var mongoose = require("mongoose");

const url = 'mongodb://heroku_8qkx0qm1:JeucUXVmti8cUMn@ds129045.mlab.com:29045/heroku_8qkx0qm1'
//'mongodb://heroku_kvdqb8k0:7piN5DpFHB4BG2v@ds129085.mlab.com:29085/heroku_kvdqb8k0';
var db = mongoose.connect(
  url
);

const Color = require('./color');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/:color', (req, res) =>{ 
    Color.find(req.params.color, function(err, color) {
        if (err) res.status(500).send(err);
        else {
          res.json(color);
        }
      });
    res.send(color);
});

app.post('/:color', (req, res) => {
    const color_ = req.params.color;
    //sun weights 1.989 * 10^30 kg = 1989000 * 10^24 kg;
    //earth weights 5.972 * 10^24 kg;
    const weight = 1989;
    const planetweight = 5.972;

    var color = new Color({color: color_, weight: weight, planet: planetweight});

    res.send(color)
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))