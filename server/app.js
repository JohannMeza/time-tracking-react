const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const app = express();

const routeHome = require('./route/home.route');
const routeActivities = require('./route/activities.route');
const routeSchedule = require('./route/schedule.route');
const routeUser = require('./route/user.route');

// -- Config
app.set('port', 5000);

app.use(express.static(path.join(__dirname, '../', '/public')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

// -- Middleware

// -- Rutas
app.use('/api/timetracking/', routeHome);
app.use('/api/timetracking/activities', routeActivities);
app.use('/api/timetracking/schedule', routeSchedule);
app.use('/api/timetracking/user', routeUser);


module.exports = app