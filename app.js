//MayanWolfe VOD at 3:00 pm on 8/7/2022: Let's do the Traversy CRUD OAuth Homework! #100Devs (Homework assignment from Class 43: 8/2/2022) ****  Stopped at 6:10:00 ****

const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })
connectDB()
const app = express()

//Passport config
require('./config/passport')(passport)

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// Handlebars
// Add the word .engine after exphbs
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
    })
)
app.set('view engine', '.hbs');


// Session
app.use
(session({
        secret:'keyboard cat',
        resave: false,
        saveUninitialized: false,
    })
)


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')))


// Routes
app.use ('/', require('./routes/index'))
app.use ('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8500

app.listen(PORT, 
    console.log (`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))