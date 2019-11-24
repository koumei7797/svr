'use strict';

const fs = require('fs');
const flatbuffers = require('./flatbuffers').flatbuffers;
const GameTable = require('./GameTable_generated').GameTable;

const m = module.exports;
m.data = {};

m.GOLD = 'gold';
m.CASH = 'cash';
m.RCASH = 'rCash';
m.MATERIAL = 'material';
m.POTION = 'potion';
m.EQUIP = 'equip';
m.SKIN = 'skin';
m.EQUIPBOX = 'equipBox';
m.UTILITY = 'utility';
m.ADVERTISE = 'advertise';
m.MONEY = 'money';

m.load = () => {
    try {
        let data = new Uint8Array(fs.readFileSync('GameTable.bytes'));
        let buf = new flatbuffers.ByteBuffer(data);
        let allTable = GameTable.All.getRootAsAll(buf);
        let _dt = {};
    
        for(const k in allTable.__proto__) {
            if (!k.includes('Length')) continue;
            let tableName = k.substr(0, k.length - 6);
            let dtData = {};
    
            for (var i = 0; i < allTable[k](); i++) {
                var val = allTable[tableName](i);
                let obj = {};
                for (const kk in val.__proto__) {
                    if (kk === '__init') continue;
                    obj[kk] = val[kk]();
                }
    
                if(obj.id) dtData[obj.id] = obj;
            }
    
            _dt[tableName] = dtData;
        }
    
        m.data = _dt;
    } catch (err) {
        throw err;
    }
};