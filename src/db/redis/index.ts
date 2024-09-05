import Redis from 'ioredis';

const redis = new Redis({
  host: process.env['REDIS_HOST'],
  port: Number(process.env['REDIS_PORT']),
  username: process.env['REDIS_USERNAME'],
  password: process.env['REDIS_PASSWORD'],
  enableAutoPipelining: true,
  keyPrefix: `rider_lite:${process.env.NODE_ENV}:`,
});

redis
  .on('connect', () => {
    console.log('Redis connected');
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('close', () => {
    console.log('Redis disconnected');
  });

export default redis;
