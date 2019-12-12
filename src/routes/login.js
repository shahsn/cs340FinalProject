const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/login', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'login',
        createViewContext({
            pageName: 'Login Page'/*,
            rows: []*/
        })
    );
});

router.post('/login', (req, res, next) => {
  console.log("test");
  if (
    (req.db.query(`SELECT COUNT(1) FROM Employee e WHERE ? = (SELECT e.eID FROM Employee e WHERE e.job = 'Manager')`, [req.body.eID], (err,results) => {
      if (err) return next(err);
    })) == 1
  ){
    console.log("test2");
    req.session.permissions = 2;
    res.render(
      'home',
      createViewContext({
          pageName: 'Manager Page'/*,
          rows: []*/
      })
    )
  }
  else if (true){
    console.log("test3");
    req.db.query(`SELECT * FROM Employee e WHERE e.eID = ?`, [req.body.eID], (err,results) => {
      if (err) return next(err);
      if (result.length){
        console.log("test4");
        req.session.permissions = 1;
        res.render(
          'home',
          createViewContext({
              pageName: 'Employee Page'/*,
              rows: []*/
          })
        )
      }
    });
  }
  else {
    req.session.permissions = 0;
    res.render(
      'home',
      createViewContext({
          pageName: 'Customer Page'/*,
          rows: []*/
      })
    )
  }
});
module.exports = router;
