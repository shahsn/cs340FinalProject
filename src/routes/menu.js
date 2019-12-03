const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/menu', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'menu',
        createViewContext({
            pageName: 'Store Menus',
            rows: []
        })
    );
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/menu/edit', (req, res) => {
    res.render('menu-edit', createViewContext({ message: 'Edit Menu' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/menu/edit', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('menu-edit', context);
});

module.exports = router;
