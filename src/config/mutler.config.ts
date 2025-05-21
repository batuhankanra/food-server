// src/config/multer-config.ts (veya projenizde uygun bir yere)

import multer, { FileFilterCallback } from 'multer';
import path from 'path'; // Dosya yollarıyla çalışmak için
import fs from 'fs';     // Dosya sistemi işlemleri için
import { Request } from 'express';

// Yüklenen resimlerin saklanacağı klasör
const UPLOAD_DIRECTORY = path.resolve(__dirname, 'uploads'); 
console.log(__dirname)// Bu daha olası görünüyor

console.log(`Hedeflenen yükleme klasörü: ${UPLOAD_DIRECTORY}`); // Yolu kontrol etmek için loglayın

// DiskStorage ayarları: Dosyaların nereye ve hangi isimle kaydedileceğini belirler
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, UPLOAD_DIRECTORY); // Dosyaların kaydedileceği klasör
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Dosya adını eşsiz hale getirelim (örn: originalname-timestamp.extension)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname); // Dosya uzantısını al
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

// Dosya filtresi: Sadece belirli resim türlerini kabul etmek için
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Dosyayı kabul et
  } else {
    // Dosyayı reddet ve bir hata fırlat
    cb(new Error('Geçersiz dosya tipi. Sadece JPEG, PNG, GIF, WEBP formatındaki resimler kabul edilir.'));
  }
};

// Multer'ı yapılandırılmış ayarlarla başlat
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // Dosya boyutu limiti (örneğin 5MB)
  },
});

export default upload;