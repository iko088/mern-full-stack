require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()
const adminRouter = require('./router/admin-router')
const ServiceRouter = require('./router/service-router')
const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router')
const connectDb = require('./utils/db');
const errorMiddleware = require("./middleware/error-middleware");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/auth', authRouter)

app.use('/api/form', contactRouter)

app.use('/api/data', ServiceRouter)

// Admin router 
app.use('/api/admin', adminRouter)


// error handling 
app.use(errorMiddleware)



const PORT = 5000;

connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`app is run on http://localhost:${PORT}`)
});
});