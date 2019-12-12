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
        ORDER BY s.sID
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

router.get('/storeinfo/edit', (req, res) => {
  if (req.session.permissions == 2) {
    res.render('storeinfo-edit', createViewContext({ message: 'Edit Stores' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});


router.post('/storeinfo/edit', (req, res, next) => {
    let context = createViewContext();
    req.db.query(`SELECT * FROM Store s WHERE s.sID = ?`,[req.body.sID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            context.message = 'cant add that Store, it already exists!';
            res.render('storeinfo-edit',context);
        }else {
            req.db.query(
                `INSERT INTO Store (sID, street, city, zip, hours) VALUES (?,?,?,?,?)`,
                [req.body.sID, req.body.Street, req.body.City, req.body.ZIP, req.body.Hours],
                err => {
                    if(err) return next(err);
                    context.message = 'Added new Store!';
                    res.render('storeinfo-edit', context);
                }
            );
        }
    });
});

router.get('/storeinfo/delete', (req, res) => {
  if (req.session.permissions == 2) {
    res.render('storeinfo-delete', createViewContext({ message: 'Delete Store' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});


router.post('/storeinfo/delete', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Store WHERE sID = ? `,[req.body.sID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            req.db.query(
                `DELETE FROM Store WHERE sID = ?`,
                [req.body.sID],
                err => {
                    if(err) return next(err);
                    context.message = 'deleted a Store!';
                    res.render('storeinfo-delete', context);
                }
            );
        }else {
            context.message = 'cant delete that Store, it doesnt exist!';
            res.render('storeinfo-delete',context);
        }
    });
});
module.exports = router;
