const control = require('../controllers/FolderMaster.js');
const router = require('express').Router();

router.get('/',control.all);
router.post('/',control.create);
router.put('/',control.update);

module.exports = router;