'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ---------------------------------------------------------------------------------------
const guildJoinInfo = new Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId },
});
// ---------------------------------------------------------------------------------------
const guildMemberSchema = new Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId },
    position:   { type: Number, default: 0 },
    donate:     { type: Number, default: 0 },
    attend:     { type: Date, default: Date.now },
});
// ---------------------------------------------------------------------------------------
const guildBoard = new Schema({
    userId:     { type: mongoose.Schema.Types.ObjectId },
    text:       { type: String }
});
// ---------------------------------------------------------------------------------------
const guildSchema = new Schema({
    name:       { type: String, trim: true, unique: true },
    text:       { type: String },                          
    emblem:     { type: Number },                          
    level:      { type: Number, default: 1 },              
    exp:        { type: Number, default: 0 },              
    donate:     { type: Number, default: 0 },              
    type:       { type: Number, default: 1 },              
    member:     [guildMemberSchema],                       
    board:      [guildBoard],                              
    request:    [guildJoinInfo],                           
});
// ---------------------------------------------------------------------------------------
guildSchema.statics.create = async function (name, userId) {
    const guild = new this({
        name
    });
    guild.member.push({userId: userId, position: 1});
    
    return await guild.save();
};
// ---------------------------------------------------------------------------------------
module.exports = mongoose.model('Guild', guildSchema);
// ---------------------------------------------------------------------------------------
