import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./lib";
import { logger, logResponseBody } from "./common";
import { apiRouter } from './routes';

const cookieParser = require('cookie-parser');

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

const start = async () => {

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use(logResponseBody);

  app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.send("hello");
  });

  app.use('/api', apiRouter);
  
  app.listen(process.env.PORT, () => {
    logger.info(`Server is running at ${process.env.PORT}`);
  });
}

const server = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to database has been successfully established!');
    await start();
  } catch (error) {
    logger.error('Server initilization failed',error);
  }
}

server();

