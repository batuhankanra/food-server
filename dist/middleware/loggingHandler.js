"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHandler = loggingHandler;
const logger_1 = __importDefault(require("../lib/logger"));
function loggingHandler(req, res, next) {
    logger_1.default.info('------------------------------------------');
    logger_1.default.info(`Incoming Methods:${req.method} - URL : ${req.url} - IP:${req.socket.remoteAddress}`);
    res.on('finish', () => {
        if (res.statusCode > 205) {
            logger_1.default.error(`Incoming - Method :[${req.method}] - URL: [${req.url}] - IP:[${req.socket.remoteAddress}]--Status:[${res.statusCode}]`);
        }
        else {
            logger_1.default.info(`Incoming - Method :[${req.method}] - URL: [${req.url}] - IP:[${req.socket.remoteAddress}]--Status:[${res.statusCode}]`);
        }
    });
    logger_1.default.info('------------------------------------------');
    next();
}
//# sourceMappingURL=loggingHandler.js.map