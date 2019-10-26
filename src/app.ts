import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';

import routes from './routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan('dev'));
  }

  private database(): void {
    mongoose.connect(
      process.env.MONGO_URI || 'mongodb://mongo:27017/move',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
