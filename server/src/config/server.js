import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Initialize
const app = express();

// Routes
import transactionRoutes from '../routes/transaction.route.js'

/* Server Settings */
// Local Port
const PORT = process.env.PORT;
app.set('port', PORT);

// Middlewares
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('tiny'));

// API(s) Routes
app.use('/api/v1/transaction', transactionRoutes)

export default app;