const express = require('express');
const mongoose = require('./server/mongoose');
const bodyparser = require('body-parser');

let app = express();
// Hook up pre Routing Middleware
app.use(bodyparser.json());
// Load the Routes onto Express
require('./routes')(app);

// Hook up middleware

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port);