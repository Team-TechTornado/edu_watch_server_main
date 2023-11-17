import { promisify } from "util";
import redis from "redis";

export const redisClient = redis.createClient({ url: process.env.REDIS_URL });

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);
