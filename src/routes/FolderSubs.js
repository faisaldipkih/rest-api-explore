const control = require('../controllers/FolderSubs');
const router = require('express').Router();

router.get('/show-master/:folder_m_id',control.show_master);
router.get('/show-parent/:parent_id',control.show_parent);
router.get('/show-back/:folder_s_id',control.show_back);
router.post('/',control.create);
// router.post('/',control.create);
// router.put('/',control.update);

module.exports = router;