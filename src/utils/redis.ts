import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URL }); // 배포용 코드
// export const redisClient = createClient(); // 로컬 테스트용 코드
