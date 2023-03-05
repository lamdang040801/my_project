import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const port: number = parseInt(process.env.PORT as string) ?? 3000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', (req: Request, res: Response): Response<string> => {
    return res.status(200).send("Hello My App");
})

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});