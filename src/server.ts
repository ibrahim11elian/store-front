import express from 'express';
import bodyParser from 'body-parser';
import route from './routes/router';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
export const app: express.Application = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', route);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({
    name: 'am good ma man',
  });
});

// if (!module.parent) {
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
// }
