import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import propertyRouter from './routes/property.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

// המחרוזת להתחברות ל-MongoDB
const mongoURI = 'mongodb+srv://tslilaharon1:0MWxhcPOT2ZhJCbC@home-link.4lwapet.mongodb.net/?retryWrites=true&w=majority&appName=home-link';

mongoose.connect(mongoURI).then(() => {
    console.log('connected to MongoDB')
}).catch((err) => {
    console.log('not connect to MongoDB')
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
