const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/emp', (req, res, next) => {
    // TODO: implement the selection query
    req.db.query(
        `
        SELECT * 
        FROM Employee e,
        ORDER BY e.eID
        `,
        (err,results) => {
            if (err) return next(err);
            res.render(
                'emp',
                createViewContext({
                    pageName: 'Employee Info',
                    rows: results
                })
            );
        }
    );
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/emp/edit', (req, res) => {
    res.render('emp-edit', createViewContext({ message: 'Edit Employees' }));
});

/**
 * Logic for actually adding a new "part" supplier using data from a form submission.
 */
router.post('/emp/edit', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('emp-edit', context);
});

module.exports = router;
