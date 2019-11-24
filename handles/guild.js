'use strict'

const handles = require('./index');
const table = require('../lib/table');
const CONST = require('../lib/constant');
const Guild = require('../models/guild');

handles.user.guildList = async (param, user) => {
    const guildList = await Guild.find().select({ name: 1, level: 1}).limit(10);

    return {cmd: param.cmd, result: {guildList}};
};

handles.user.guildSearch = async (param, user) => {
    const name = param.name;

    const guild = await Guild.findOne({name});

    return {cmd: param.cmd, result: {guild}};
};

handles.user.guildInfo = async (param, user) => {
};

handles.user.guildCreate = async (param, user) => {
    const name = param.name;

    if (await Guild.findOne({name})) throw CONST.ERROR.EXISTS_GUILD;
    if (user.guildId) throw CONST.ERROR.JOINED_GUILD;

    let guild = await Guild.create(name, user.id);
    user.guildId = guild.id;
    user = await user.save();

    return {cmd: param.cmd, result: {user, guild}};
};

handles.user.guildJoin = async (param, user) => {
    const _id = param.guildId;

    let guild = await Guild.findOne(_id);
    if (guild === null) throw CONST.ERROR.NOT_EXISTS_GUILD;
    if (guild.member.length >= 30) throw CONST.ERROR.MAX_GUILD_MEMBERS;

    if (guild.type === 1) {
        // join guild
        guild.member.push({userId: user.id});
        user.guildId = guild.id;

        user = await user.save();
        guild = await guild.save();
    } else {
        // guild master join accept
        if (guild.request.length >= 30) throw CONST.ERROR.MAX_GUILD_JOIN_REQUEST;
        
        for (const i in guild.request) {
            if (guild.request[i].userId === user.id) throw CONST.ERROR.REQUESTED_GUILD;
        }

        guild.request.push({userId: user.id});
        guild = await guild.save();
    }

    return {cmd: param.cmd, result: {user, guild}};
};

handles.user.guildJoinCancel = async (param, user) => {
};

handles.user.guildJoinToMaster = async (param, user) => {
};

handles.user.guildJoinToUser = async (param, user) => {
};

handles.user.guildMasterJob = async (param, user) => {
};

handles.user.guildJoin = async (param, user) => {
};

handles.user.guildBoardWrite = async (param, user) => {
};

handles.user.guildAttend = async (param, user) => {
};

handles.user.guildExit = async (param, user) => {
    user.guildId = null;
    user = await user.save();

    return {cmd: param.cmd, result: {user}};
};

