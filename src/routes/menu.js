const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing menu info.
 */
router.get('/menu', (req, res, next) => {
    req.db.query(
        `
        SELECT *
        FROM Menu m
        ORDER BY m.sID, m.itemName
        `,
        (err,results)=>{
            if (err) return next(err);
            res.render(
                'menu',
                createViewContext({
                    pageName: 'Store Menus',
                    rows: results
                })
            );
        }
    );

});

/**
 * Route for displaying the form used to add a new menu 
 */
router.get('/menu/edit', (req, res) => {
    res.render('menu-edit', createViewContext({ message: 'Edit Menu' }));
});

/**
 * Logic for adding a new item to the menu
 */
router.post('/menu/edit', (req, res, next) => {
    let context = createViewContext();

    req.db.query(`SELECT * FROM Menu m WHERE m.sID = ? AND m.itemName = ?`,[req.body.sID, req.body.itemName], (err,results) => {
        if (err) return next(err);

        if (results.length){
            context.message = 'cant create that menu item, it already exists at that store';
            res.render('menu-edit',context);
        }else {
            req.db.query(`SELECT  * FROM Store s WHERE s.sID = ?`,[req.body.sID],(err,results)=>{
                if (err) return next(err);
                if(results.length){
                    req.db.query(
                        `INSERT INTO Menu (itemName, itemPrice, sID) VALUES (?,?,?)`,
                        [req.body.itemName, req.body.itemPrice, req.body.sID],
                        err => {
                            if(err) return next(err);
                            context.message = 'Added new menu item';
                            res.render('menu-edit', context);
                        }
                    );
                }
                else{
                    context.message = 'cant create that menu item, sID invalid';
                    res.render('menu-edit',context);
                }
            });
        }
    });
});

router.get('/menu/delete', (req, res) => {
    res.render('menu-delete', createViewContext({ message: 'Remove Menu' }));
});

/**
 * Logic for deleting a menu item
 */
router.post('/menu/delete', (req, res, next) => {
    let context = createViewContext();
    req.db.query(`SELECT * FROM Menu WHERE sID = ? AND itemName = ?`,[req.body.sID, req.body.itemName], (err,results) => {
        if (err) return next(err);

        if (results.length){
            req.db.query(
                `DELETE FROM Menu WHERE itemName = ? AND sID = ?`,
                [req.body.itemName , req.body.sID],
                err => {
                    if(err) return next(err);
                    context.message = 'deleted a menu item';
                    res.render('menu-delete', context);
                }
            );
        }else {
            context.message = 'cant delete that menu item, it doesnt exist';
            res.render('menu-delete',context);
        }
    });
});

module.exports = router;
