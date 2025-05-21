"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../middleware/multer"));
const food_controller_1 = __importDefault(require("../controllers/food.controller"));
const router = (0, express_1.Router)();
router.get('/', food_controller_1.default.GetItem);
router.post('/add', multer_1.default.single('file'), food_controller_1.default.CreatedItem);
router.put('/update/:id', multer_1.default.single('file'), food_controller_1.default.updatedItem);
router.delete('/delete/:id', food_controller_1.default.DeletedItem);
router.get('/:id', food_controller_1.default.FindById);
exports.default = router;
//# sourceMappingURL=food.route.js.map