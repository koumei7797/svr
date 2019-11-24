'use strict';

const util = require('util');
const crypto = require('crypto');
const request = require('request');
const config = require('../config');
const CONST = require('../lib/constant');
const logger = require('../lib/logger');

const m = module.exports;

m.verifyGoogle = async (receipt, signature) => {
    try {
        const verify = crypto.createVerify('RSA-SHA1').update(receipt);
        const check = verify.verify(config.google.billingKey, signature, 'base64');
        if (!check) throw CONST.ERROR.ERROR_VALID_CHECK;
    } catch (err) {
        logger.debug(err);
        throw CONST.ERROR.ERROR_VALID_CHECK;
    }
};

m.verifyApple = async (receipt) => {
    const response = await util.promisify(request)({
        url: config.apple.verifyReceiptUrl,
        body: JSON.stringify({'receipt-data': receipt}),
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        method: 'POST'
    });
    logger.debug(JSON.stringify(response));

    if (response.statusCode !== 200) throw CONST.ERROR.ERROR_VALID_CHECK;
    try {
        const ret = JSON.parse(response);
        logger.debug(JSON.stringify(ret));
    } catch (err) {
        logger.debug(err);
        throw CONST.ERROR.ERROR_VALID_CHECK;
    }
};