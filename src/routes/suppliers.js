const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing part suppliers.
 */
router.get('/suppliers', (req, res, next) => {
    req.db.query('SELECT * FROM Suppliers', (err, results) => {
        if (err) return next(err);
        res.render(
            'suppliers',
            createViewContext({
                pageName: 'List Suppliers',
                rows: results
            })
        );
    });
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/suppliers/add', (req, res) => {
    res.render('suppliers-add', createViewContext({ message: 'Add New Supplier' }));
});

/**
 * Logic for actually adding a new part supplier using data from a form submission.
 */
router.post('/suppliers/add', (req, res, next) => {
    let context = createViewContext();

    // Make sure a supplier with the provided SID doesn't already exist
    req.db.query('SELECT * FROM Suppliers WHERE sid = ?', [req.body.sid], (err, results) => {
        if (err) return next(err);

        if (results.length) {
            // Already exists
            context.message = `Can't create supplier with SID ${req.body.sid} because it already exists`;
            res.render('suppliers-add', context);
        } else {
            // Doesn't exist, create it
            req.db.query(
                'INSERT INTO Suppliers (sid, sname, city) VALUES (?,?,?)',
                [req.body.sid, req.body.sname, req.body.city],
                err => {
                    if (err) return next(err);

                    context.message = 'Record added successfully';
                    res.render('suppliers-add', context);
                }
            );
        }
    });
});

module.exports = router;
