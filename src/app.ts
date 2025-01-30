import express from 'express';
import cors from 'cors';
import { categoryRouter, subcategoryRouter, itemRouter } from './routes';

const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/subcategory', subcategoryRouter);
app.use('/api/v1/item', itemRouter);

export default app;
