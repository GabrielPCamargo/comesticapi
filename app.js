import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';

import './src/database';
import homeRoutes from './src/routes/homeRoutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default App().app;
