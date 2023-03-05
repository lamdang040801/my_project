import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes/route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

export default app;