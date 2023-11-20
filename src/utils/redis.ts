import { promisify } from "util";
import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URL });

export const getAsync = promisify(redisClient.get).bind(redisClient);
export const setAsync = promisify(redisClient.set).bind(redisClient);
