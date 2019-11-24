'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ---------------------------------------------------------------------------------------
const auctionSchema = new Schema({
    tId:        { type: Number, index: true },
    price:      { type: Number },
    grade:      { type: Number, index: true },
    enchant:    { type: Number },
    sellerId:   { type: mongoose.Schema.Types.ObjectId }
});
// ---------------------------------------------------------------------------------------
auctionSchema.statics.create = async function (tId, price, grade, enchant, sellerId) {
    const auction = new this({
        tId,
        price,
        grade,
        enchant,
        sellerId
    });
    
    return await auction.save();
};
// ---------------------------------------------------------------------------------------
module.exports = mongoose.model('Auction', auctionSchema);
// ---------------------------------------------------------------------------------------
