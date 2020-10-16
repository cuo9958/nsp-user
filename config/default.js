/**
 * 默认配置
 */
module.exports = {
    name: "nsp-user",
    //开发环境数据库
    db: {
        host: "127.0.0.1",
        port: "3306",
        database: "database",
        user: "data-user",
        password: "1234567",
        connectionLimit: 2,
    },
    //开发环境，普通redis配置
    redis: {
        port: 6379,
        host: "127.0.0.1",
        password: "123456",
    },
};
