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

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/colors', (req, res) => {
    Color.find({})
    .then( (colors) => {
        res.send(colors);
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

app.put('/:color', (req, res) => {
    // console.log(req);
    console.log(req.query.distance);
    if (req.query && req.query.distance) {
        // res.send("have distance");
        console.log(req.params.color);
        // return res.send("fine");
        Color.find({ color: req.params.color }, (err, me) => {
            if (err) res.status(500).send(err);
            else {
                const player_2 = 'blue';
                // return res.send(me);
                Color.find({ color: player_2 }, (err, target) => {
                    if (err) return res.send(err);
                    else {
                        target = target[0];
                        me = me[0];
                        const planetWeight = target.planet;

                        if (planetWeight == 0 ) {
                            console.log("no planets available");
                            // return res.send(me);
                        } 
                        else {

                            console.log('target ', target);
                            const targetWeight = target.weight;
                            
                            const targetDistance = target.distance;
                            
                            var weight = me.weight;
                            const distance = parseInt(req.query.distance);//  - targetDistance;
    
                            const Fg = 9.8 * weight * planetWeight / (distance * distance);
                            const Fg_target = 9.8 * targetWeight * planetWeight / (targetDistance * targetDistance);
    
                            console.log('Fg = ', Fg);
                            console.log('Ft = ', Fg_target);
                            if (Fg > Fg_target) {
                                console.log('updating');
                               var planet = me.planet;
                               weight += planet;
                               planet = planetWeight;
    
                               target.planet = 0;
                               target.distance = 0;
                               target.save();
    
                               me.weight = weight;
                               me.planet = planet;
                               me.distance = distance;
                               me.save();
                            //    res.send({can : true});
                            }

                        }
                        
                    }
                });
                res.send(me);
                // res.send({can : false});
            }
        })
        .catch(err => console.log(err));
    } else {
       // res.send("no query");
    }
    
});

app.post('/:color', (req, res) => {

    console.log('in post');
    const color_ = req.params.color;

    //sun weights 1.989 * 10^30 kg = 1989000 * 10^24 kg;
    var  random = Math.floor(Math.random() * 10) + 1;
    const weight = 1989 * random;

    //earth weights 5.972 * 10^24 kg;
    random = Math.floor(Math.random() * 10) + 1;
    const planetweight = 5.972 * random;

    //distance between the sun and the eart is 149.6 million km
    random = Math.floor(Math.random() * 10) + 1;
    const distance = 149.6 * random;

    var color = new Color({
        color: color_, 
        weight: weight, 
        planet: planetweight, 
        distance: distance
    });

    color.save();
    res.send(color)
});

// const port = 3000;
const port =  process.env.PORT || 3000;
// app.set('port', process.env.PORT || 3000 );
app.listen( port, () => console.log(`Example app listening on port ${port}!`))