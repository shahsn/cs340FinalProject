const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/orderlog', (req, res, next) => {
    req.db.query(
        `
        SELECT * 
        FROM Order_Log o,
        SORT BY o.sID, o.oID
        `,
        (err,results)=>{
            if (err) return next(err);
            res.render(
                'orderlog',
                createViewContext({
                    pageName: 'Order Log',
                    rows: results
                })
            );
        }
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

router.get('/orderlog/delete', (req, res) => {
    res.render('orderlog-delete', createViewContext({ message: 'Delete Order' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/orderlog/delete', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Delete not implemented yet!';
    res.render('orderlog-delete', context);
});

module.exports = router;
