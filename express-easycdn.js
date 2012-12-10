// express-easyCDN
// Copyright (c) 2012 Jamie Steven, jamiesteven on github.
// Licensed under MIT

getBucket = function(string, numbuckets) {
    var bucket, hash;
    hash = crc32(string);
    bucket = hash % numbuckets;
    return bucket;
};

crc32 = function(s) {
    var c, crc, finalXORValue, i, initialValue, j, polynomial, reverse, table;
    reverse = function(x, n) {
        var b;
        b = 0;
        while (n) {
            b = b * 2 + x % 2;
            x /= 2;
            x -= x % 1;
            n--;
        }
        return b;
    };
    s = String(s);
    polynomial = 79764919;
    initialValue = 4294967295;
    finalXORValue = 4294967295;
    crc = initialValue;
    table = [];
    i = void 0;
    j = void 0;
    c = void 0;
    i = 255;
    while (i >= 0) {
        c = reverse(i, 32);
        j = 0;
        while (j < 8) {
            c = (c * 2 ^ (c >>> 31) % 2 * polynomial) >>> 0;
            j++;
        }
        table[i] = reverse(c, 32);
        i--;
    }
    i = 0;
    while (i < s.length) {
        c = s.charCodeAt(i);
        if (c > 255) {
            throw new RangeError();
        }
        j = crc % 256 ^ c;
        crc = (crc / 256 ^ table[j]) >>> 0;
        i++;
    }
    return (crc ^ finalXORValue) >>> 0;
};

var CDN = function(path, cdn, httpsCdn) {
    if (httpsCdn) {
        if (httpsCdn.length) {
            return httpsCdn[getBucket(path, httpsCdn.length)] + path;
        } else {
            return httpsCdn + path;
        }
    } else if (cdn) {
        if (cdn.length) {
            return cdn[getBucket(path, cdn.length)] + path;
        } else {
            return cdn + path;
        }
    } else {
        return path;
    }
}

module.exports = CDN;