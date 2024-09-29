const {
    Sequelize,
    Files
} = require('../models');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/'); // Folder tujuan penyimpanan file
    },
    filename: (req, file, cb) => {
        // Buat nama file yang unik menggunakan timestamp
        cb(null, file.originalname);
        // cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Controller untuk upload file
const uploadFile = async (req, res) => {
    // Jika tidak ada file yang di-upload
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Kirimkan respons sukses beserta informasi file
    const data = {
        file_id: nanoid(),
        file_name: req.file.originalname
    }
    if (req.body.folder_m_id) {
        data.folder_m_id = req.body.folder_m_id
    }
    if (req.body.folder_s_id) {
        data.folder_s_id = req.body.folder_s_id
    }
    await Files.create(data)

    res.send({
        status: true,
        message: 'File uploaded successfully',
        file: req.file,
    });
};

module.exports = { upload, uploadFile };