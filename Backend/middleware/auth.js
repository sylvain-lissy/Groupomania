const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.RND_TKN)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            throw "Utilisateur non-reconnu !"
        } else {
            next()
        }
    } 
    catch (error) {
        res.status(401).json({ error: error || "Requête non authentifiée !" })
    }
}