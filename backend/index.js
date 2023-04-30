const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const sessions = require('express-session');
const app = express();
const AppRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

app.use(express.json())
app.use(cookieParser())

//Middleware
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave: false, 
    cookie: { 
        maxAge: oneDay ,
        httpOnly: true
    },
}));

app.use('/api/', AppRouter);

app.listen(process.env.BACKEND_PORT, () => {
    console.log("server has started on port " + process.env.BACKEND_PORT);
});
