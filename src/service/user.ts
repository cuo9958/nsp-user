import { nanoid } from "nanoid";
import CacheService from "./cache";

/**
 * 根据用户名生成token
 * @param username 用户名
 */
function CreateToken(username: string, data: any) {
    const token = nanoid();
    CacheService.set(`user_${username}_${token}`, JSON.stringify(data));
    return token;
}
/**
 * 检查用户信息
 * @param username 用户名
 * @param token token
 */
async function CheckUserToken(username: string, token: string) {
    const data = await CacheService.get(`user_${username}_${token}`);
    try {
        if (!data) return null;
        const model = JSON.parse(data);
        return model;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default {
    CheckUserToken,
    CreateToken,
};
