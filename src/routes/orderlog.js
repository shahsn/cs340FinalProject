const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing order log info.
 */
router.get('/orderlog', (req, res, next) => {
    req.db.query(
        `
        SELECT *
        FROM Order_Log o
        ORDER BY o.sID, o.oID
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

router.get('/orderlog/edit', (req, res) => {
    res.render('orderlog-edit', createViewContext({ message: 'Edit Orders' }));
});

router.post('/orderlog/edit', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Order_Log o WHERE o.oID = ?`,[req.body.oID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            context.message = 'cant add that order, it already exists';
            res.render('orderlog-edit',context);
        }else {
            req.db.query(
                `INSERT INTO Order_Log (oID, customerFName,totalPrice, date, sID) VALUES (?,?,?,?,?)`,
                [req.body.oID, req.body.customerFName, req.body.totalPrice, req.body.Date, req.body.sID],
                err => {
                    if(err) return next(err);
                    context.message = 'Added new order!';
                    res.render('orderlog-edit', context);
                }
            );
        }
    });
});

router.get('/orderlog/delete', (req, res) => {
    res.render('orderlog-delete', createViewContext({ message: 'Delete Order' }));
});


router.post('/orderlog/delete', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Order_Log WHERE oID = ? `,[req.body.oID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            req.db.query(
                `DELETE FROM Order_Log WHERE oID = ?`,
                [req.body.oID],
                err => {
                    if(err) return next(err);
                    context.message = 'deleted an order';
                    res.render('orderlog-delete', context);
                }
            );
        }else {
            context.message = 'cant delete that order, it doesnt exist';
            res.render('orderlog-delete',context);
        }
    });
});

module.exports = router;
