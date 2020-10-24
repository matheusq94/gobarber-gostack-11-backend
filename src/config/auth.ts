import { Secret } from 'jsonwebtoken';

interface IJWTConfig {
  secret: Secret;
  expiresIn: string;
}

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  } as IJWTConfig,
};
