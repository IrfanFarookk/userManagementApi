import express from "express";
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import Routes from "./routes";
import logger from "./utils/logger";

dotenv.config();

mongoose.connect('mongodb://localhost:27017/user_registration', {
    serverSelectionTimeoutMS: 20000})
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sessions
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

new Routes(app);

app.listen(port, () => logger.info(`service running in port: ${port}`));