import Redis from 'ioredis';

const redis = new Redis(process.env['UPSTASH_REDIS_HOST'] as string, {
  enableAutoPipelining: true,
  keyPrefix: `rider_lite:${process.env.NODE_ENV}:`,
  showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
});

redis
  .on('error', (err) => {
    console.error(err);
  })
  .on('close', () => {
    console.log('Redis disconnected');
  });

export default redis;
