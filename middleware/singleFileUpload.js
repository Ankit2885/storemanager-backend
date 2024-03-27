const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb, next) {
        const fileData = path.parse(file.originalname);
        cb(null, fileData.name + '_' + Date.now() + fileData.ext);
    }
});

const upload = multer({ storage: storage });

exports.singleFileUpload = upload.single('file')