const multer = require("multer");

//storage config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //file will be saved in the 'uploads' directory
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        //generate a unique name for the image to avoid overwriting existing files
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null, filename);
    },
});

//filter
const filefilter =  (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        callback(null, true);
    } else {
        callback(null, true);
         return callback(new Error('Please upload only jpg or png images'));
        // callback(new Error('Please upload only jpg or png images'), false);
    }
};

const movieupload = multer({
    storage:storage,
    fileFilter: filefilter
});

module.exports = movieupload