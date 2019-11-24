'use strict'

const config = module.exports

config.parserLimit = '500kb'
config.serverPort = 7777

config.redis = {
    host: 'localhost',
    port: 6379,
    keyDelimiter: ':',
    expireTime: 300,
    channel: 'publisher'
};

config.winston = {level: 'silly'};

config.TOKEN_EXPIRE_TIME = 86400; // 24 hours change
config.SESSION_SECRET = 'ABCDE$#@!AB$#@$'; 

config.mongodb = {
    uri: 'mongodb://account:auth@localhost:27017/game',
    use: false
};

config.google = {
    billingKey: [
        '-----BEGIN PUBLIC KEY-----',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        '-----END PUBLIC KEY-----'
    ].join('\n')
};

config.apple = {
    verifyReceiptUrl: 'https://sandbox.itunes.apple.com/verifyReceipt'
    // verifyReceiptUrl: 'https://buy.itunes.apple.com/verifyReceipt'
};