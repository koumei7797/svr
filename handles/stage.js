'use strict'

const handles = require('./index');
const table = require('../lib/table');

handles.user.clearStage = async (param, user) => {
    const dmg = param.dmg;

    let result = await user.save();

    return result;
};

handles.user.failStage = async (param, user) => {
    
};