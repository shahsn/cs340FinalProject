const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/menu', (req, res, next) => {
    req.db.query(
        `
        SELECT *
        FROM Menu m,
        SORT BY m.sID, m.Item Name
        `,
        (err,results)=>{
            if (err) return next(err);
            res.render(
                'menu',
                createViewContext({
                    pageName: 'Store Menus',
                    rows: results
                })
            );
        }
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

router.get('/menu/delete', (req, res) => {
    res.render('menu-delete', createViewContext({ message: 'Remove Menu' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/menu/delete', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Delete not implemented yet!';
    res.render('menu-delete', context);
});

module.exports = router;
