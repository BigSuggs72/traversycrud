//MayanWolfe VOD at 3:00 pm on 8/7/2022 - Part 1: Let's do the Traversy CRUD OAuth Homework! #100Devs (Homework assignment from Class 43: 8/2/2022)
//MayanWolfe VOD at 6:00 pm on 8/8/2022 - PART 2: Let's do the Traversy CRUD OAuth Homework! #100Devs

const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })
connectDB()
const app = express()

//Passport config
require('./config/passport')(passport)


//Body parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())


// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const {formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')


// Handlebars
// Add the word .engine after exphbs ***
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select
    },
    defaultLayout: 'main',
    extname: '.hbs'
    })
);
app.set('view engine', '.hbs');


// Sessions
app.use
(session({
        secret:'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Set global variable
app.use (function (req, res, next) {
    res.locals.user = req.user || null
    next()
})


// Static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use ('/', require('./routes/index'))
app.use ('/auth', require('./routes/auth'))
app.use ('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 8500

app.listen(PORT, 
    console.log (`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))