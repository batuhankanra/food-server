"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_route_1 = __importDefault(require("./food.route"));
const router = (0, express_1.Router)();
router.use('/food', food_route_1.default),
    router.get('/', (req, res) => {
        res.json({ msg: 'sa' });
    });
exports.default = router;
//# sourceMappingURL=index.route.js.map