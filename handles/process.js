'use strict'

const handles = require('./index');
const common = require('../lib/common');
const CONST = require('../lib/constant');
const User = require('../models/user');

handles.process.login = async (param) => {
    let result = await User.findOneByLoginId(param.loginId);
    if (!result) throw CONST.ERROR.NOT_MATCHING_USER;

    let token = await common.setToken(result.id);

    return {cmd: param.cmd, result: result, token: token};
};

handles.process.register = async (param) => {
    let result = await User.findOneByLoginId(param.loginId);
    if (result) throw CONST.ERROR.EXISTS_USER;

    result = await User.findOneByNick(param.nick);
    if (result) throw CONST.ERROR.DUPLICATE_NICK;

    result = await User.create(param.loginId, param.nick, param.platform, param.sysLang);

    let token = await common.setToken(result.id);

    return {cmd: param.cmd, result: result, token: token};
};