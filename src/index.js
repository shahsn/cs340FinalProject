/**
 * Node.js Web Application Template
 *
 * The code below serves as a starting point for anyone wanting to build a
 * website using Node.js, Express, Handlebars, and MySQL. You can also use
 * Forever to run your service as a background process.
 */
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { createViewContext } = require('./utils');
const homeRouter = require('./routes/home');
const storeinfoRouter = require('./routes/storeinfo');
const orderlogRouter = require('./routes/orderlog');
const menuRouter = require('./routes/menu');
const loginRouter = require('./routes/login');
const empRouter = require('./routes/emp');

//create const for every page that has actions (order log, employees, storeinfo, menus, etc

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        ifeq: function(a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});
//app.engine('hbs', hbs.engine);
//app.set('view engine', 'hbs');

// Configure handlebars
/*const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});*/

// Configure the views
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(path.basename(__dirname), 'views'));

// Setup static content serving
app.use(express.static(path.join(path.basename(__dirname), 'public')));



/**
 * Create a database connection. This is our middleware function that will
 * initialize a new connection to our MySQL database on every request.
 */
const config = require('./config');
app.use((req, res, next) => {
		console.log("connecting to database");
    let conn = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.dbname
    });
    conn.connect((err) => {
        if (err) {
					console.log("failed connecting to database");
					return next(err);
        }
				req.db = conn;
        console.log("successfull connection to database");
        next();
    });
});

/**
 * This is the handler for our main page. The middleware pipeline includes
 * our custom `connectDb()` function that creates our database connection and
 * exposes it as `req.db`.
 */
app.get('/', function(req, res) {
  console.log('Got request for the home page');

  res.render('home',createViewContext());
});



// Add our routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(homeRouter);
/*
app.get('/home', function(req, res) {
  console.log('Got request for the home page');

  res.render('home',createViewContext());

  close(req);
});
*/

app.use(empRouter);
app.use(loginRouter);
app.use(menuRouter);
app.use(orderlogRouter);
app.use(storeinfoRouter);

app.use('*', (req, res) => {
  res.status(404);
  res.render('error', createViewContext());
});
/**
 * Handle all of the resources we need to clean up. In this case, we just need
 * to close the database connection.
 *
 * @param {Express.Request} req the request object passed to our middleware
 */
 /*
function close(req) {
  if (req.db) {
    req.db.end();
    req.db = undefined;
    console.log('Database connection closed');
  }
}
*/
/**
 * Capture the port configuration for the server. We use the PORT environment
 * variable's value, but if it is not set, we will default to port 3000.
 */
const port = process.env.PORT || 3021;

/**
 * Start the server.
 */
app.listen(port, function() {
  console.log('== Server is listening on port', port);
});
