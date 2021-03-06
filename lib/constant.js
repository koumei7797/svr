'use strict';

const m = module.exports;

m.COMMON = {
    GUILD_CREATE_PRICE: 1000,
};

m.ERROR = {
    NO_DATA : 'NO_DATA',
    CMD_INVALID: 'CMD_INVALID',
    MISSING_PARAMETER: 'MISSING_PARAMETER',
    NOT_MATCHING_USER: 'NOT_MATCHING_USER',
    EXISTS_USER: 'EXISTS_USER',
    DUPLICATE_NICK: 'DUPLICATE_NICK',
    MISSING_TOKEN: 'MISSING_TOKEN',
    OVERLAP_LOGIN: 'OVERLAP_LOGIN',

    EXISTS_GUILD: 'EXISTS_GUILD',
    NOT_EXISTS_GUILD: 'NOT_EXISTS_GUILD',
    JOINED_GUILD: 'JOIN_GUILD',
    MAX_GUILD_MEMBERS: 'MAX_GUILD_MEMBERS',
    MAX_GUILD_JOIN_REQUEST: 'MAX_GUILD_JOIN_REQUEST',
    REQUESTED_GUILD: 'REQUESTED_GUILD',

    NULL: 'NULL',

    ERROR_VALID_CHECK: 'ERROR_VALID_CHECK',
    ERROR_OVERLAP_REQUEST: 'ERROR_OVERLAP_REQUEST',
};