"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_1 = __importDefault(require("../models/food"));
class FoodService {
    async GetItem() {
        try {
            const data = await food_1.default.find({});
            if (!data) {
                return null;
            }
            return data;
        }
        catch {
            return null;
        }
    }
    async CreatedItem({ title, description, ingredients, steps, image, category }) {
        try {
            const data = new food_1.default({ title, description, ingredients, steps, image, category });
            await data.save();
            return true;
        }
        catch {
            return false;
        }
    }
    async Updateditem(id, updates) {
        try {
            await food_1.default.findByIdAndUpdate(id, updates);
            return true;
        }
        catch {
            return false;
        }
    }
    async DeleteItem(id) {
        try {
            const data = await food_1.default.findById(id);
            const deleteItem = await food_1.default.findByIdAndDelete(id);
            if (!deleteItem) {
                return false;
            }
            return data;
        }
        catch {
            return false;
        }
    }
    async FindById(id) {
        try {
            const data = [];
            data.push(await food_1.default.findById(id));
            if (!data) {
                return false;
            }
            return data;
        }
        catch {
            return false;
        }
    }
}
exports.default = new FoodService();
//# sourceMappingURL=food.service.js.map