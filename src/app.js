const express = require('express')
const session = require('express-session');
const ENV = require('./config')
const publicRoutes = require('./routes/public-routes')
const userRoutes = require('./routes/user-routes')
const adminRoutes = require('./routes/admin-routes')
const MongoDBStore = require('connect-mongodb-session')(session);
require('./db/mongoose')
const store = new MongoDBStore({
    uri: ENV.sessionStoreUri,
    collection: 'session',
    clear_interval: 3600
})
const app = express()

app.use(
    session({
        secret:ENV.sessionSecret,
        cookie:{
            maxAge: 1000 * 60
        },
        store: store,
        resave: true,
        saveUninitialized: true
    })
)

app.use(express.json())
app.use(publicRoutes)
app.use(userRoutes)
app.use(adminRoutes)




app.listen(ENV.port,()=>{
    console.log(`Server started: http://127.0.0.1:${ENV.port}`)
})