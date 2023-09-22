import dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

export const sequelizeConfig: SequelizeOptions = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
};
