const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/goals', require('./Routes/goalRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`));
