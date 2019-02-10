const express = require('express');


// var mongo = require('mongodb');
//mongodb://heroku_kvdqb8k0:7piN5DpFHB4BG2v@ds129085.mlab.com:29085/heroku_kvdqb8k0
var mongoose = require("mongoose");

const url = 'mongodb://heroku_8r5bwnlw:ruup4j4krv9pr1j75m9ghi7rrm@ds125021.mlab.com:25021/heroku_8r5bwnlw'


const connect = mongoose.connect(url, {});

connect.then((db) => {
    var dbs = mongoose.connection;
    console.log('Connected correctly to server');
  }, (err) => { console.log("ERRR ", err);} );

const Color = require('./color');

const app = express();


var cors = require('cors');
app.use(cors());


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/colors', (req, res) => {
    return Color.find({})
    .then( (colors) => {
        res.json(colors);
    }, (err) => console.log(err))
    .catch((err) => console.log(err));
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

    console.log('in post');
    const color_ = req.params.color;
    //sun weights 1.989 * 10^30 kg = 1989000 * 10^24 kg;
    //earth weights 5.972 * 10^24 kg;
    const weight = 1989;
    const planetweight = 5.972;

    var color = new Color({color: color_, weight: weight, planet: planetweight});
    console.log('before save');
    color.save();
    res.send(color)
});

// const port = 3000;
const port =  process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000 );
app.listen( port, () => console.log(`Example app listening on port ${port}!`))