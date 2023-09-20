const express = require('express');
const { connect } = require('./database/cosmos-connector');

const port = 3000;
const app = express();

const purchasesRoutes = require('./routes/purchases-routes');
const vendorRoutes = require('./routes/vendor-routes');

console.log(`Application running on port ${3000}`);

app.get('/', async (req, res, next) => {
    res.send('<h2>Main Page</h2>')
});

app.use('/api/purchases/', purchasesRoutes);
app.use('/api/vendors/', vendorRoutes);

app.listen(port);
