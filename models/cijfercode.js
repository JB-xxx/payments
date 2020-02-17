const opts = { toJSON: { virtuals: true } };
var mongoose = require('mongoose')
var moment = require('moment');

moment.locale('nl');


var Schema = mongoose.Schema;

var cijferCodeSchema = new Schema ({
    code: {type: Number, required: true},
    name: {type: String, required: true, max: 10},
    datum: {type: Date},
}, opts);

/*
const userSchema = mongoose.Schema({
    _id: Number,
    email: String
  }, opts);
*/



cijferCodeSchema.virtual('geboren').get(function() {
    return moment(this.datum).format('DD-MM-YYYY');
  });

//Export model
module.exports = mongoose.model('Cijfercode', cijferCodeSchema);
