const router  = require('express').Router();
const authenticateMW = require('../middlewares/authenticate');

const {sortOptions, filterOptions} = require('../constants');
 
router.get('/sort', authenticateMW, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Sort operation fetched successfully',
        data: sortOptions,
        err: [],
    })
});

router.get('/filter', authenticateMW, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Filter operation fetched successfully',
        data: filterOptions,
        err: [],
    })  
});
module.exports = router