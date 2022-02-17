const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const cookieParser = require("cookie-parser");
const { jwtStrategy } = require('./config/passport');
const dotenv = require("dotenv");
dotenv.config();
// const db = require("./config/database")

const app = express();

const authRoutes = require('./routes/auth');
const home = require('./routes/home');
const admin = require('./routes/admin');
const user = require('./routes/user');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/', home);
app.use('/admin', admin);
app.use('/user', user);

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;