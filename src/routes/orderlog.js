const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing order log info.
 */
router.get('/orderlog', (req, res, next) => {
  if (req.session.permissions >= 1) {
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
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});

router.get('/orderlog/edit', (req, res) => {
  if (req.session.permissions >= 1) {
    res.render('orderlog-edit', createViewContext({ message: 'Edit Orders' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});

router.post('/orderlog/edit', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Order_Log o WHERE o.oID = ?`,[req.body.oID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            context.message = 'cant add that order, it already exists';
            res.render('orderlog-edit',context);
        }else {
            req.db.query(`SELECT * FROM Store s WHERE s.sID = ?`,[req.body.sID], (err,results) =>{
                if(err) return next(err);
                if(results.length){
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
                else{
                    context.message = 'cant add that order, sID doesnt exist';
                    res.render('orderlog-edit',context);
                }
            });
        }
    });
});

router.get('/orderlog/delete', (req, res) => {
  if (req.session.permissions >= 1) {
    res.render('orderlog-delete', createViewContext({ message: 'Delete Order' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
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
                    context.message = 'Deleted an order';
                    res.render('orderlog-delete', context);
                }
            );
        }else {
            context.message = 'Cant delete that order, it doesnt exist';
            res.render('orderlog-delete',context);
        }
    });
});

router.get('/orderlog/item', (req, res) => {
    res.render('orderlog-item', createViewContext({ message: 'View Order' }));
});



router.post('/orderlog/item', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Order_Log WHERE oID = ? `,[req.body.oID], (err,results) => {
        if (err) return next(err);

        // if (results.length){
        //     req.db.query(
        //         `DELETE FROM Order_Log WHERE oID = ?`,
        //         [req.body.oID],
        //         err => {
        //             if(err) return next(err);
        //             context.message = 'deleted an order';
        //             res.render('orderlog-delete', context);
        //         }
        //     );
        // }
        else {
            context.message = 'cant view that order, it doesnt exist';
            res.render('orderlog-view',context);
        }
    });
});


module.exports = router;
