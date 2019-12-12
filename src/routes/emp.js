const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/emp', (req, res, next) => {
  if (req.session.permissions == 2) {
    req.db.query(
        `
        SELECT *
        FROM Employee e
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
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }

});

router.get('/emp/edit', (req, res) => {
  if (req.session.permissions == 2) {
    res.render('emp-edit', createViewContext({ message: 'Edit Employees' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});

router.post('/emp/edit', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Employee e WHERE e.eID = ?`,[req.body.eID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            context.message = 'cant add that new employee, that employee already exists';
            res.render('emp-edit',context);
        }else {
            req.db.query(
                `INSERT INTO Employee (eID, fName, lName,job,sID) VALUES (?,?,?,?,?)`,
                [req.body.eID, req.body.fName, req.body.lName, req.body.Job, req.body.sID],
                err => {
                    if(err) return next(err);
                    context.message = 'Added new Employee';
                    res.render('emp-edit', context);
                }
            );
        }
    });
});

router.get('/emp/delete', (req, res) => {
  if (req.session.permissions) {
    res.render('emp-delete', createViewContext({ message: 'Remove Employee' }));
  }
  else {
    res.render(
      'permission_error',
      createViewContext()
    );
  }
});


router.post('/emp/delete', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Employee WHERE eID = ? `,[req.body.eID], (err,results) => {
        if (err) return next(err);

        if (results.length){
            req.db.query(
                `DELETE FROM Employee WHERE eID = ?`,
                [req.body.eID],
                err => {
                    if(err) return next(err);
                    context.message = 'removed an employee';
                    res.render('emp-delete', context);
                }
            );
        }else {
            context.message = 'cant delete that employee, they dont exist in the system';
            res.render('emp-delete',context);
        }
    });
});

module.exports = router;
