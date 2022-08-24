import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/router';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// creating express app instance
export const app: express.Application = express();

// using moragn fo logging
app.use(morgan('tiny'));

// using CORS to let the client talk to server without security interruption
app.use(cors());

// for parsing
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routs
app.use('/api', route);

// home direct to readme file
app.get('/', (req: express.Request, res: express.Response) => {
  res.redirect('https://github.com/ibrahim11elian/Image-Processing-API#readme');
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
