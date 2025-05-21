"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../lib/logger"));
const food_service_1 = __importDefault(require("../services/food.service"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
class FoodController {
    async GetItem(req, res) {
        try {
            const data = await food_service_1.default.GetItem();
            if (!data) {
                res.status(404).json({ msg: 'database problem ' });
            }
            res.status(200).json(data);
        }
        catch (err) {
            logger_1.default.error('getItem food controller error');
            res.status(500).json({ msg: 'intervanel problem' });
        }
    }
    async CreatedItem(req, res) {
        try {
            const { _id, title, description, ingredients, steps, category } = req.body;
            if (!title || !description || !ingredients || !steps || !category) {
                res.status(400).json({ msg: 'invalid request' });
            }
            const filePath = req.file?.path;
            if (!filePath) {
                res.status(400).json({ msg: 'Dosya eksik' });
                return;
            }
            const result = await cloudinary_1.default.uploader.upload(filePath, { folder: 'food-website' });
            // Geçici dosyayı sil
            fs_1.default.unlinkSync(filePath);
            const image = result.secure_url;
            const ingredientParse = JSON.parse(ingredients);
            const stepsParse = JSON.parse(steps);
            const data = await food_service_1.default.CreatedItem({ title, description, ingredients: ingredientParse, steps: stepsParse, image, category });
            if (!data) {
                res.status(400).json({ msg: 'hata' });
                return;
            }
            res.status(201).json({ msg: 'Oluşturuldu' });
            return;
        }
        catch (err) {
            logger_1.default.error('created food controller error');
            res.status(500).json({ msg: 'intervanel problem' });
        }
    }
    async updatedItem(req, res) {
        try {
            const id = req.params.id;
            const foodQuery = req.body;
            const filePath = req.file?.path;
            const updateds = {};
            if (filePath) {
                // 1. Mevcut Cloudinary resmini sil
                if (foodQuery.oldImage) {
                    await cloudinary_1.default.uploader.destroy(foodQuery.oldImage);
                }
                const result = await cloudinary_1.default.uploader.upload(filePath, { folder: 'food-website' });
                updateds.image = result.secure_url;
            }
            if (foodQuery.title) {
                updateds.title = foodQuery.title;
            }
            if (foodQuery.description) {
                updateds.description = foodQuery.description;
            }
            if (foodQuery.ingredients) {
                const ingredientParse = JSON.parse(foodQuery.ingredients);
                updateds.ingredients = ingredientParse;
            }
            if (foodQuery.steps) {
                const stepsParse = JSON.parse(foodQuery.steps);
                updateds.steps = stepsParse;
            }
            if (foodQuery.category) {
                updateds.category = foodQuery.category;
            }
            const data = await food_service_1.default.Updateditem(id, updateds);
            if (!data) {
                res.status(404).json({ msg: 'tarif bulunamadi ' });
            }
            res.status(200).json({ msg: 'Basarili' });
            return;
        }
        catch (err) {
            logger_1.default.error('updated food controller error');
            res.status(500).json({ msg: 'intervanel problem' });
        }
    }
    async DeletedItem(req, res) {
        try {
            const id = req.params.id;
            const data = await food_service_1.default.DeleteItem(id);
            if (!data) {
                res.status(404).json({ msg: 'tarif bulunamadi ' });
            }
            await cloudinary_1.default.uploader.destroy(`food-website${data.image.split('food-website')[1].split('.')[0]}`);
            res.status(200).json({ msg: 'Basarili' });
            return;
        }
        catch (err) {
            logger_1.default.error('created food controller error');
            res.status(500).json({ msg: 'intervanel problem' });
        }
    }
    async FindById(req, res) {
        try {
            const id = req.params.id;
            const data = await food_service_1.default.FindById(id);
            if (!data) {
                res.status(404).json({ msg: 'tarif bulunamadi ' });
            }
            res.status(200).json({ data });
            return;
        }
        catch (err) {
            logger_1.default.error('created food controller error');
            res.status(500).json({ msg: 'intervanel problem' });
        }
    }
}
exports.default = new FoodController();
//# sourceMappingURL=food.controller.js.map