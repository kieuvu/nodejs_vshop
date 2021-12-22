const multer = require('multer');

class ImageUploader {
  productImage(req, res, next) {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, './src/public/uploads/img/');
      },
    });

    const upload = multer({
      storage: storage,
    });

    const imageUpload = upload.fields([
      { name: 'prd_stImg', maxCount: 1 },
      { name: 'prd_scImg', maxCount: 1 },
      { name: 'prd_rdImg', maxCount: 1 },
      { name: 'prd_thImg', maxCount: 1 },
    ]);

    return imageUpload;
  }
}

module.exports = new ImageUploader;