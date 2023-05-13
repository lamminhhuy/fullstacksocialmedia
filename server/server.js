require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser= require ('cookie-parser')
const axios = require('axios')
const SocketServer = require('./socketServer');
const {PDFDocument} = require('pdf-lib')
const path = require('path')

const { ExpressPeerServer } = require('peer')
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://readchoice.vercel.app/'
  }));
app.use(cookieParser())
app.get('/',(req,res)=> {
    res.json("Hello!");
})

//Socket

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/notifyRouter'))
app.use('/api', require('./routes/messageRouter'))
app.use('/api', require('./routes/bookRouter'))
app.use('/api', require('./routes/bookshelfRouter'))
app.use('/api', require('./routes/ratingRouter'))
app.use('/api', require('./routes/reviewRouter'))
app.use('/api', require('./routes/reportRouter'))
app.use('/api', require('./routes/groupRouter'))
const URI = process.env.MONGODB_URL
mongoose.connect(URI, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})

const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})
