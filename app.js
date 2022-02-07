const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const db = require("./config/database")

const app = express();

const authRoutes = require('./routes/auth');
const home = require('./routes/home');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/', home);


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;