var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true},
  dateRegistered: { type: Date, default: Date.now },
  screenName: { type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, require: true},
  follow: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

UserSchema.virtual('fullName')
    .get(function() {
            return this.firstName + ' ' + this.lastName;
    });


module.exports = Mongoose.model('User', UserSchema);