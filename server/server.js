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
    origin:'https://readchoice.vercel.app'
  }));
app.use(cookieParser())
app.get('/',(req,res)=> {
    res.json("Hello!");
})

//Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
      origin:  '*',
      methods: ['GET', 'POST'],
    },
  });

io.on('connection', socket => {
    console.log('A user connected');
    SocketServer(socket)
})
ExpressPeerServer(http, { path: '/' })
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

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

app.use('/api', require('./routes/discussionRouter'))
app.get('/books/:id/:pageNumber', async (req, res) => {
  try {
    const { id, pageNumber } = req.params;

    const url = `https://books.google.com/books?id=${id}&lpg=PP1&pg=PA${pageNumber}&output=embed`;
    const response = await axios.get(url);

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
const URI = process.env.MONGODB_URL
mongoose.connect(URI, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})


app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/iframe-url/:id/:pageNumber", async (req, res) => {
  const { id, pageNumber } = req.params;
  const iframeSrc = `https://books.google.com/books?id=${id}&lpg=PP1&pg=PA${pageNumber}&output=embed`;
  try {
    res.send(iframeSrc)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})

// Kết nối tới cơ sở dữ liệu MongoDB


// Gọi hàm thực hiện thay đổi unique index
