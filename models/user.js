'use strict';
const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ---------------------------------------------------------------------------------------
const equipSchema = new Schema({
    tId:        { type: Number },
    enchant:    { type: Number, default: 0 },
});
// ---------------------------------------------------------------------------------------
const itemSchema = new Schema({
    tId:        { type: Number },
    count:      { type: Number, default: 0 },
});
const couponSchema = new Schema({
    name:       { type: String },
});
// ---------------------------------------------------------------------------------------
const purchaseSchema = new Schema({
    tId:        { type: Number },
    count:      { type: Number, default: 1 },
});
// ---------------------------------------------------------------------------------------
const postSchema = new Schema({
    tId:        { type: Number },
    limit:      { type: Date, default: 0 },
});
// ---------------------------------------------------------------------------------------
const userSchema = new Schema({
    loginId:        { type: String, unique: true },
    nick:           { type: String, trim: true, unique: true },
    platform:       { type: Number, default: 0 },
    sysLang:        { type: Number, default: 0 },
    ban:            { type: Date, default: 0 },

    gold:           { type: Number, default: 0 },
    cash:           { type: Number, default: 0 },
    rcash:          { type: Number, default: 0 },

    guildId:        { type: mongoose.Schema.Types.ObjectId },

    auction:        [],
    stage:          {},
    item:           [itemSchema],
    equip:          [equipSchema],
    coupon:         [couponSchema],
    purchase:       [purchaseSchema],
    post:           [postSchema],
    updated :   { type: Date, default: Date.now },
});
// ---------------------------------------------------------------------------------------
userSchema.virtual('regDate').get(function() {
    return moment(this._id.generationTime * 1000);
});
// ---------------------------------------------------------------------------------------
userSchema.pre('save', function(next) {
    this.updated = Date.now();
    this.increment();
    return next();
});
// ---------------------------------------------------------------------------------------
// create new User document
userSchema.statics.create = async function (loginId, nick, platform, sysLang) {
    const user = new this({
        loginId,
        nick,
        platform,
        sysLang
    });
    
    return await user.save();
};
// ---------------------------------------------------------------------------------------
userSchema.statics.findOneByLoginId = async function (loginId) {
    return await this.findOne({ loginId });//.exec();
};
// ---------------------------------------------------------------------------------------
userSchema.statics.findOneById = async function (_id) {
    return await this.findOne({ _id });//.exec();
};
// ---------------------------------------------------------------------------------------
userSchema.statics.findOneByNick = async function (nick) {
    return await this.findOne({ nick });//.exec();
};
// ---------------------------------------------------------------------------------------
userSchema.methods.verify = function(password) {
    return this.password === password;
};
// ---------------------------------------------------------------------------------------
module.exports = mongoose.model('User', userSchema);
// ---------------------------------------------------------------------------------------