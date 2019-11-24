const _ = require('lodash');
const fs = require('fs');
const redis = require('../lib/redis');
const common = require('../lib/common');
const CONST = require('../lib/constant');
const logger = require('../lib/logger');
const User = require('../models/user');

const m = module.exports;

m.handles = {};
m.process = {};
m.user = {};
m.cmds = {};

fs.readdirSync('handles').forEach(v => {
    if (v === 'index.js') return;
    if (!fs.statSync(['.', 'handles', v].join('/')).isFile()) return;
    require(['.', v.split('.')[0]].join('/'));
});

_.forEach(m.process, (fn, key) => m.cmds[key] = {fn: fn, type: 'process'});
_.forEach(m.user, (fn, key) => m.cmds[key] = {fn: fn, type: 'user'});

const userHandler = async (handle, data) => {
    if (common.checkParameter(data.id)) throw CONST.ERROR.MISSING_PARAMETER;
    if (common.checkParameter(data.token)) throw CONST.ERROR.MISSING_PARAMETER;

    var check = await redis.getToken(data.id, data.token);
    if (check === null) throw CONST.ERROR.MISSING_TOKEN;
    if (check !== data.token) throw CONST.ERROR.OVERLAP_LOGIN;

    const user = await User.findOneById(data.id);
    if (!user) throw CONST.ERROR.NOT_MATCHING_USER;

    return await handle.fn(data, user);
};

m.handler = async (req, res) => {
    try {
        let body = req.body;
        if (Array.isArray(body)) body = body[0];

        const handle = m.cmds[body.cmd];
        if (!handle) throw 9999;

        let resData;
        if (handle.type === 'process') {
            resData = await handle.fn(body);
        } else {
            resData = await userHandler(handle, body);
        };

        resData = JSON.stringify(resData);
        resData = Buffer.from(resData, 'utf-8');
        
        res.set('content-length', resData.length);
        res.write(resData);
        res.end();
        logger.info(resData);
    } catch (err) {
        if (err.name === 'VersionError') {
            logger.error(err.message);
            res.write(CONST.ERROR.ERROR_OVERLAP_REQUEST);
            res.end();
        } else {
            let errorInfo = {cmd: req.body.cmd, error: err};
            if (err.stack) errorInfo.error = err.stack;
            const resData = JSON.stringify(errorInfo);
            res.set('content-length', resData.length);
            res.write(resData);
            res.end();
            logger.error(resData);
        }
    }    
};