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

/*
router.post('/emp/edit', (req, res, next) => {
  let context = createViewContext();

  if (
    req.db.query(`? IN (SELECT e.eID FROM Employee e WHERE e.eID = Manager)`, [req.body.eID] (err,results) => {
      if (err) return next(err);
    });
  ){
    req.session.permissions = 2;
  }
  else if (
    req.db.query(`? IN (SELECT e.eID FROM Employee e`, [req.body.eID] (err,results) => {
      if (err) return next(err);
    });
  ){
    req.session.permissions = 1;
  }
  else {
    req.session.permissions = 0;
  }
}
});
*/
module.exports = router;
