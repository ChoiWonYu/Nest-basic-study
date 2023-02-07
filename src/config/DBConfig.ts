import { registerAs } from '@nestjs/config';

export default registerAs('DB', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}));
