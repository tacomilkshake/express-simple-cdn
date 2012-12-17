// express-easyCDN
// Copyright (c) 2012 Jamie Steven, jamiesteven on github.
// Licensed under MIT

var crc = require('crc');

getBucket = function(string, numbuckets) {
    var hash = crc.crc8(string);
    var bucket = hash % numbuckets;
    return bucket;
};

var CDN = function(path, cdn) {
    var d = new Date();
    if (cdn) {
        if (cdn instanceof Array) {
            return cdn[getBucket(path, cdn.length)] + path;
        } else {
            return cdn + path;
        }
    } else {
        return path;
    }
}

module.exports = CDN;