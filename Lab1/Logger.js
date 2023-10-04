"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var fs = require("fs");
var Logger = /** @class */ (function () {
    function Logger(logFileName) {
        this.logFile = fs.createWriteStream(logFileName, { flags: 'a' });
    }
    Logger.prototype.log = function (operation, details) {
        var timestamp = new Date().toISOString();
        this.logFile.write("[".concat(timestamp, "] ").concat(operation, ": ").concat(details, "\n"));
    };
    return Logger;
}());
exports.Logger = Logger;
