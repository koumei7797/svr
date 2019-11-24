'use strict';
const config = require('./config');
const logger = require('./lib/logger');
const table = require('./lib/table');
const mongoose = require('mongoose');
const express = require('express');
const asyncify = require('express-asyncify');
const compression = require('compression');

(async () => {
    try {
        // ==============================================
        // CONNECT TO MONGODB SERVER
        // ==============================================

        if (config.mongodb.use) {
            await mongoose.connect(config.mongodb.uri, { useNewUrlParser: true });
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);
            logger.debug('connected to mongodb server');    
        }
        table.load();
        
        console.log(table.data);

        const handles = require('./handles');
        const server = asyncify(express());
        server.set('view engine', 'ejs');
        server.use(compression());
        server.use(express.json());
        server.use(express.raw({limit: config.parserLimit}));

        // ELB healthCheck
        server.get('/ELB-Health', (req, res) => res.sendStatus(200));
        server.post('/api', handles.handler);
        server.listen(config.serverPort);

        logger.debug(`[ Server On : ${config.serverPort} ]`);
    } catch (err) {
        if (typeof err !== 'string') {
            if (err.stack) {
                console.log(err.stack);
                console.log(err.toString());
            } else {
                console.log(err);
            }
        }        
    }
})();