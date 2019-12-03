const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/login', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'login',
        createViewContext({
            pageName: 'Login Page'/*,
            rows: []*/
        })
    );
});
module.exports = router;
