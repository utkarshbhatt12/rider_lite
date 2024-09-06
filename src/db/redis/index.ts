import Redis from 'ioredis';

const keyPrefix = `rider_lite:${process.env.NODE_ENV}:`;
const enableAutoPipelining = true;

const redis =
  process.env.NODE_ENV === 'development'
    ? new Redis({
        keyPrefix,
        enableAutoPipelining,
        host: process.env['REDIS_HOST'],
        port: Number(process.env['REDIS_PORT']),
        username: process.env['REDIS_USERNAME'],
        password: process.env['REDIS_PASSWORD'],
      })
    : new Redis(process.env['UPSTASH_REDIS_HOST'] as string, {
        enableAutoPipelining,
        keyPrefix,
      });

redis
  .on('error', (err) => {
    console.error(err);
  })
  .on('close', () => {
    console.log('Redis disconnected');
  });

export default redis;
