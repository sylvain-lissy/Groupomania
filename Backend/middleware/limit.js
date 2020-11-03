const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5000,
    message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
})

module.exports = { limiter }