// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'rentry'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);

const propertyRouter = require('./routes/property.routes');
app.use('/property', propertyRouter);

const bookingRouter = require('./routes/booking.routes');
app.use('/booking', bookingRouter);

const reviewRouter = require('./routes/review.routes');
app.use('/review', reviewRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
