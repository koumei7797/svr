'use strict';

const moment = require('moment');
const clc = require('cli-color');
const {createLogger, format, transports} = require('winston');
const {combine, printf} = format;
const config = require('../config');

const colors = (info) => {
    switch (info) {
        case 'error': return 'red';
        case 'warn': return 'magenta';
        case 'info': return 'cyan';
        case 'verbose': return 'yellow';
        case 'debug': return 'white';
        case 'silly': return 'blue';
    }
};

const levelText = (level) => {
    switch (level) {
        case 'error': return 'E';
        case 'warn': return 'W';
        case 'info': return 'I';
        case 'verbose': return 'V';
        case 'debug': return 'D';
        case 'silly': return 'S';
    }
}


// 이전 ver
const formatter = printf(info => {
    const date = moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss');
    const message = `[${date}][${info.level.toUpperCase()}] ${info.message}`;
    console.log(message);
    return clc[colors(info.level)](message);
});

module.exports = createLogger({
    level: config.winston.level, format: combine(formatter), transports: [new transports.Console()]
});