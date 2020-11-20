const db = require("../models")
const User = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Creation d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    if (User.length === 0) {
        bcrypt.hash(process.env.Admin_password, 10)
        .then(hash => {
            const user = new User({
                id: 1,
                userName: process.env.Admin_userName,
                email: process.env.Admin_email,
                password: hash,
                avatar: `${req.protocol}://${req.get("host")}/images/${process.env.Admin_avatar}`,
                isAdmin: true,
                isActive: true
            })
            user.save()
        })
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
        })
        user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch(error => res.status(401).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({where: { email: req.body.email }})
    .then(user => {
        if (user.isActive === false) { 
            return res.status(403).json({ error: "Utilisateur supprimé !" })
        }
        if(!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé !" })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: "Mot de passe incorrect !" })
            }
            res.status(200).json({
                message: "Utilisateur connecté !",
                userId: user.id,
                role: user.isAdmin,
                userName : user.userName,
                avatar : user.avatar,
                token: jwt.sign( { userId: user.id }, process.env.RND_TKN, { expiresIn: '24h' } )
            })
        })
        .catch(error => res.status(501).json({ error }))
    })
    .catch(error => res.status(502).json({ error }))
} 