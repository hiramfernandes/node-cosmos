const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

const purchasesRoutes = require('./routes/purchases-routes');
const vendorRoutes = require('./routes/vendor-routes');

console.log(`Application running on port ${3000}`);

app.use(bodyParser.json());

app.get('/', async (req, res, next) => {
    res.send('<h2>Main Page</h2>')
});

app.use('/api/purchases/', purchasesRoutes);
app.use('/api/vendors/', vendorRoutes);

app.listen(port);

// TODO: Add CORS Support
// TODO: Add Swagger

