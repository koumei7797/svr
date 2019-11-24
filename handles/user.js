'use strict'

const handles = require('./index');

handles.user.insertItem = async (param, user) => {
     user.item.push({tId: Number(param.item_id)});
     let result = await user.save();

     return result;
};