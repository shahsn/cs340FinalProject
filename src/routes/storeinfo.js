const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/storeinfo', (req, res, next) => {
    req.db.query(
        `
        SELECT *
        FROM Store s
        SORT BY s.sID
        `,
        (err,results)=>{
            if (err) return next(err);
            res.render(
                'storeinfo',
                createViewContext({
                    pageName: 'Store Hours and Locations',
                    rows: results
                })
            );
        }
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

router.get('/storeinfo/delete', (req, res) => {
    res.render('storeinfo-delete', createViewContext({ message: 'Delete Store' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/storeinfo/delete', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Delete not implemented yet!';
    res.render('storeinfo-delete', context);
});
module.exports = router;
