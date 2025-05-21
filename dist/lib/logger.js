"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const prefix = chalk_1.default.gray(`[${new Date().toLocaleDateString()}]`);
const logger = {
    info: (message) => {
        console.log(`${prefix}---${chalk_1.default.blueBright('[INFO]')}---${message}`);
    },
    success: (message) => {
        console.log(`${prefix}-----${chalk_1.default.green('[SUCCESS]')}---${message}`);
    },
    warn: (message) => {
        console.warn(`${prefix}----${chalk_1.default.yellow('[WARN]')}---${message}`);
    },
    error: (message) => {
        console.error(`${prefix}----${chalk_1.default.red('[Error]')}----${message}`);
    },
    debug: (message) => {
        console.debug(`${prefix}-----${chalk_1.default.magenta('[DEBUG]')}----${message}`);
    }
};
exports.default = logger;
//# sourceMappingURL=logger.js.map