"use strict";
// src/config/multer-config.ts (veya projenizde uygun bir yere)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path")); // Dosya yollarıyla çalışmak için
// Yüklenen resimlerin saklanacağı klasör
const UPLOAD_DIRECTORY = path_1.default.resolve(__dirname, 'uploads');
console.log(__dirname); // Bu daha olası görünüyor
console.log(`Hedeflenen yükleme klasörü: ${UPLOAD_DIRECTORY}`); // Yolu kontrol etmek için loglayın
// DiskStorage ayarları: Dosyaların nereye ve hangi isimle kaydedileceğini belirler
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIRECTORY); // Dosyaların kaydedileceği klasör
    },
    filename: (req, file, cb) => {
        // Dosya adını eşsiz hale getirelim (örn: originalname-timestamp.extension)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path_1.default.extname(file.originalname); // Dosya uzantısını al
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});
// Dosya filtresi: Sadece belirli resim türlerini kabul etmek için
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Dosyayı kabul et
    }
    else {
        // Dosyayı reddet ve bir hata fırlat
        cb(new Error('Geçersiz dosya tipi. Sadece JPEG, PNG, GIF, WEBP formatındaki resimler kabul edilir.'));
    }
};
// Multer'ı yapılandırılmış ayarlarla başlat
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // Dosya boyutu limiti (örneğin 5MB)
    },
});
exports.default = upload;
//# sourceMappingURL=mutler.config.js.map