const port = process.env.PORT
const sessionStoreUri = process.env.MONGO_DB_SESSION_STORE_URI
const dbUrl = process.env.MONGO_DB_URL
const sessionSecret = process.env.SESSION_SECRET
module.exports = {
    port,
    sessionStoreUri,
    sessionSecret,
    dbUrl
}