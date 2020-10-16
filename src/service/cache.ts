/**
 * 缓存服务，当前本机缓存，扩展redis缓存
 */
import Redis from "../db/redis";

const PREKEY = "nsp_user_";
const AGE = 604800000;

export default {
    async get(key: string) {
        const data: string | null = await Redis.get(PREKEY + key);
        if (!data) return null;
        return JSON.parse(data).v;
        // return cache.get(key);
    },
    async set(key: string, val: any, setAge = AGE) {
        return Redis.set(PREKEY + key, JSON.stringify({ v: val }), "EX", setAge);
        // return cache.set(key, val);
    },
    async has(key: string) {
        const data: string | null = await Redis.get(PREKEY + key);
        return !!data;
        // return cache.has(key);
    },
    async del(key: string) {
        Redis.del(PREKEY + key);
        // cache.del(key);
    },
};
