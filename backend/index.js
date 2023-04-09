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
    origin : "http://localhost:3000"
}))

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: thisismysecrctekeyfhrgfgrfrty84fwir767,
    saveUninitialized:true,
    resave: false, 
    cookie: { 
        maxAge: oneDay ,
        httpOnly: true
    },
}));

app.use('/api/', AppRouter);

app.listen(3001, () => {
    console.log("server has started on port " + 3001);
});