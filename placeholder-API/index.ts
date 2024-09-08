import express from 'express';
import imageRouter from './routes/imageRouter';

const app = express();
const port = 3000;

app.use('/img/api', imageRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
