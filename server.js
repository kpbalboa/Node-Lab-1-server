const express = require('express');
const app = express();
const port = 5000;
 const shoppingCartRoutes = require("./routes/shoppingCart.routes")
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use('/', shoppingCartRoutes)

app.listen(port, () => console.log('server is running'));
