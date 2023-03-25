const router  = require('express').Router();
const authenticateMW = require('../middlewares/authenticate');

const {sortOptions} = require('../constants');
 
router.get('/sort', authenticateMW, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Sort operation fetched successfully',
        data: sortOptions,
        err: [],
    })
});


module.exports = router