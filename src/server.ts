import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({
    name: 'am good ma man',
  });
});

app.listen(process.env, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
