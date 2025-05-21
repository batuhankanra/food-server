"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
const logger_1 = __importDefault(require("../lib/logger"));
function routeNotFound(req, res, next) {
    const error = new Error('Route not found');
    logger_1.default.error(String(error));
    res.status(404).json({ error: error.message });
    return;
}
//# sourceMappingURL=routeNotFound.js.map