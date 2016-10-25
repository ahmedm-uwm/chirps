var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ChripSchema = new Schema({
    chirp: {type: String, required: true},
     chirpAuthor: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
     dateCreated: {type: Date, default: Date.now},
     likes: {type: Number, default: 0},
     reChirp: {type: Boolean, deafult: false}
});

module.exports = Mongoose.model('Chirp', ChripSchema);