const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/orderlog', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'orderlog',
        createViewContext({
            pageName: 'Order Log',
            rows: []
        })
    );
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/orderlog/edit', (req, res) => {
    res.render('orderlog-edit', createViewContext({ message: 'Edit Orders' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/orderlog/edit', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('orderlog-edit', context);
});

module.exports = router;