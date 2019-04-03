//dependency mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config.json');
const dot = require('dotenv').config();

const agentSchema = new mongoose.Schema({
    EmployeeID: {type: Number, required: true, unique: true},
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type:String, required: true},
    PhoneNumber: {type: Number, required: true},
    Active: {type: Boolean, default: false},
    DeactivationMessage: {type: String, default: null},
    Updated: {type: Date, default: Date.now},
    Created: {type: Date, default: Date.now}
});

agentSchema.pre('save', (next) => {
    let agent = this;

    if (!agent.isModified('Password')) return next();

    bcrypt.genSalt(process.env.SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(agent.Password, salt, null, (err, hash) => {
            if(err) return next(err);

            agent.Password = hash;
            next();
        });
    });
});

agentSchema.methods.comparePassword = (agentPassword, callBack) => {
    bcrypt.compare(agentPassword, this.Password, (err, isMatch) => {
        if (err) return callBack(err);
        callBack(null, isMatch);
    });
};

module.exports = mongoose.model('Agent', agentSchema);