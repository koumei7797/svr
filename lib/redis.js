'use strict';

const redis = require('ioredis');
const config = require('../config');

const m = module.exports;
m.redis = new redis(config.redis.port, config.redis.host);

// ---------------------------------------------------------------------------------------
// Login Token
// ---------------------------------------------------------------------------------------
const tokenKey = (id) => ['t', id].join(config.redis.keyDelimiter);

m.setToken = async (id, token) => {
    await m.redis.setex(tokenKey(id), config.TOKEN_EXPIRE_TIME, token);
};

m.getToken = async (id, token) => {
    const myToken = await m.redis.get(tokenKey(id));
    return myToken;
};

m.delToken = async (id) => {
    await m.redis.del(tokenKey(id));
};
// ---------------------------------------------------------------------------------------
