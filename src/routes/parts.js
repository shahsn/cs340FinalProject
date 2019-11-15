const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing part suppliers.
 */
router.get('/parts', (req, res, next) => {
    // TODO: implement the selection query
  req.db.query('SELECT * FROM Parts', (err, results) => {
        if (err) return next(err);
        res.render(
            'parts',
            createViewContext({
                pageName: 'List Parts',
                rows: results
            })
        );
    });
});

/**
 * Route for displaying the form used to add a new part supplier.
 */
router.get('/parts/add', (req, res) => {
    res.render('parts-add', createViewContext({ message: 'Add New Part' }));
});

/**
 * Logic for actually adding a new part supplier using data from a form submission.
 */
router.post('/parts/add', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    // Make sure a supplier with the provided SID doesn't already exist
    req.db.query('SELECT * FROM Parts WHERE pid = ?', [req.body.pid], (err, results) => {
        if (err) return next(err);

        if (results.length) {
            // Already exists
            context.message = `Can't create supplier with PID ${req.body.pid} because it already exists`;
            res.render('parts-add', context);
        } else {
            // Doesn't exist, create it
            req.db.query(
                'INSERT INTO Parts (pid, pname, color) VALUES (?,?,?)',
                [req.body.pid, req.body.pname, req.body.color],
                err => {
                    if (err) return next(err);

                    context.message = 'Record added successfully';
                    res.render('parts-add', context);
                }
            );
        }
    });
});

module.exports = router;
