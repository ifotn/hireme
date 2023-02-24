const mongoose = require('mongoose');
// extend the functionality of this model as it's used for authentication
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// convert this model from a regular model to one that inherits all the abilities of user management
userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);