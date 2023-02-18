const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/goals', require('./Routes/goalRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`server started at port ${port}`));
