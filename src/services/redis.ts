import dotenv from "dotenv"
import Redis, {RedisOptions} from 'ioredis';
dotenv.config();


// const redisClient = new Redis(`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);

let redisOption  : RedisOptions = {
    port: process.env.REDIS_PORT as unknown as number,
    host:process.env.REDIS_HOST ,
    password : undefined,
    username:undefined
}

if(process.env.REDIS_PASSWORD) redisOption.password = process.env.REDIS_PASSWORD
if(process.env.REDIS_USER) redisOption.username = process.env.REDIS_USER


const redisClient = new Redis(redisOption)
redisClient.on('connect', () => {
    console.log(' 🚀  Connected to Redis Cloud');
});

redisClient.on('error', (error) => {
    console.error('❌ Error connecting to Redis Cloud:', error);
});

export default redisClient