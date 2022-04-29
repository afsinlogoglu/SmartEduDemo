const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//db connection
mongoose
  .connect('mongodb://localhost/smartedu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected !!');
  });
//template engine
app.set('view engine', 'ejs');

//global vars
global.userIN = null;

//middlewares
app.use(express.static('public'));
app.use(express.json()) //for parsing app/json
app.use(express.urlencoded({extended:true}))//for parsing app/x-www-form-urlencoded
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu' })
}))

//routes
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next(); 
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
