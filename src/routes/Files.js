const { upload, uploadFile } = require('../controllers/Files');
const router = require('express').Router();

router.post('/upload', upload.single('files'), uploadFile);

module.exports = router;