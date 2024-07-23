const knex = require("../database/database");

const countVisits = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const thirtyMinutesAgo = knex.raw('DATE_SUB(NOW(), INTERVAL 30 MINUTE)');
    // Kiểm tra nếu IP đã được ghi nhận trong 30 phút qua
    const existingIp = await knex('visits')
        .where('ip_address', ip)
        .andWhere('created_at', '>=', thirtyMinutesAgo)
        .first();
    if (!existingIp) {
        await knex('visits').insert({ ip_address: ip });
    }
    return next()
}
module.exports = countVisits