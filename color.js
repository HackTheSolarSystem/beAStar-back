var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var color = new Schema({
    color: {
        type: String
    },
    weight: {
        type: Number
    },
    planet: {
        type: Number
    },
    distance: {
        type: Number
    }
});

module.exports = mongoose.model("color", color);