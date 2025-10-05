import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Division } from '../divisions/division.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Division],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  logging: false,
});