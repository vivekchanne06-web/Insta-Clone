const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/post.routes');


app.use(cors({
    credentials:true,
    origin: "http://localhost:5173"  
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);

module.exports = app;