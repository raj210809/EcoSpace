import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await client.connect();  // Ensure connection is established
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
};

connectRedis();

export default client;
