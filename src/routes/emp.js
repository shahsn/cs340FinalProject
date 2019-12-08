const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/emp', (req, res, next) => {
    // TODO: implement the selection query
        res.render(
            'emp',
            createViewContext({
                pageName: 'Employee Info',
                rows: []
            })
        );
});


router.get('/emp/edit', (req, res) => {
    res.render('emp-edit', createViewContext({ message: 'Edit Employees' }));
});

router.post('/emp/edit', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('emp-edit', context);
});

router.get('/emp/delete', (req, res) => {
    res.render('emp-delete', createViewContext({ message: 'Remove Employee' }));
});


router.post('/emp/delete', (req, res, next) => {
    let context = createViewContext();

    // TODO: add the insertion query
    context.message = 'Add not implemented yet!';
    res.render('emp-delete', context);
});

module.exports = router;
