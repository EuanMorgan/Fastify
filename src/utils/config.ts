import envSchema from 'env-schema';
import {Type, Static} from '@sinclair/typebox';

// typesafe env variables

const schema = Type.Object({
  PORT: Type.Number({
    default: 4000,
  }),
  HOST: Type.String({
    default: 'localhost',
  }),
  DATABASE_URL: Type.String(),
  NODE_ENV: Type.Union(
    [
      Type.Literal('development'),
      Type.Literal('production'),
      Type.Literal('test'),
    ],
    {
      default: 'development',
    }
  ),
});

type Env = Static<typeof schema>;

export const config = envSchema<Env>({
  schema,
  dotenv: true,
});
