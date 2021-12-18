import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import '../typeorm';
import '../../container';

const app = express();

app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err) {
    return response.json({ message: err.message })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
