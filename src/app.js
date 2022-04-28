import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';

import './database';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import tokenRoutes from './routes/tokenRoutes';

dotenv.config();

const whiteList = [
  'https://cosmetics.gabrielcamargo.dev',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({
      crossOriginResourcePolicy: false,
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/products', productRoutes);
    this.app.use('/token', tokenRoutes);
  }
}

export default new App().app;
