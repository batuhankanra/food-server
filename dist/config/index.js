"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    "PORT": process.env.PORT || 3001,
    "DB_URL": process.env.DATABASE_URL || 'sa',
    "URL": process.env.URL || '',
    "CORS": process.env.CORS_ALLOWED_ORIGINS
};
//# sourceMappingURL=index.js.map