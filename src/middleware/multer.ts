import multer from 'multer';
import path from 'path';

// Upload klasörü: /src/uploads (geçici)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // dikkat: ../..
  },
  filename: function (req, file, cb) {
    console.log(file)
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;