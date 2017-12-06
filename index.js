const express = require('express');
const app = express();

// require the routes
require('./server/routes')(app);


const route = process.env.ROUTE || 5000;

app.listen(route, () => {
    console.log(`Server successfully started on Port ${route}`);
});