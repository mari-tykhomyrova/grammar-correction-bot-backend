import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const port: number = Number(process.env.PORT);

app.listen(port);
