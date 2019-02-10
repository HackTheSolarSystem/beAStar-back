var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var color = new Schema({
    color: {
        type: String
    },
    weight: {
        type: Number
    },
    planets: {
        type: String
    }
});

module.exports = mongoose.model("color", color);