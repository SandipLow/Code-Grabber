require('dotenv').config('./.env');

const connectToMongo = require('./db')
const express = require('express')

// Connecting to the db
connectToMongo()

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, auth-token, Referer, User-Agent, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Preflight', true)

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    
    next();
})

app.use(express.json())

// // Routes for the app
app.get('/', (req, res)=>{
    res.send('Hello Express...!!');
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/assets', require('./routes/assets'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
