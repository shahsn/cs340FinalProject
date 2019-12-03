const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/storeinfo', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'storeinfo',
        createViewContext({
            pageName: 'Store Hours and Locations',
            rows: []
        })
    );
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/storeinfo/edit', (req, res) => {
    res.render('storeinfo-edit', createViewContext({ message: 'Edit Stores' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/storeinfo/edit', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('storeinfo-edit', context);
});

module.exports = router;
