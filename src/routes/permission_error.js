const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/permission_error', (req, res, next) => {
    // TODO: implement the selection query
        res.render(
            'permission_error',
            createViewContext({
                pageName: 'Permission Error',
                rows: []
            })
        );
});


module.exports = router;
