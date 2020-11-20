// imports
const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require("../models");
const user = require("../models/user");

// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (Post signup)
exports.signup = (req, res, next) => {
    if (User.length === 0){
        bcrypt.hash(process.env.Admin_password, 10)
        .then(hash => {
            // Création du nouvel utilisateur
            const user = new User({
                id: 1,
                userName: process.env.Admin_userName,
                email: process.env.Admin_email,
                password: hash,
                avatar: `${req.protocol}://${req.get('host')}/images/${process.env.Admin_avatar}`,
                isAdmin: true,
                isActive: true
            })
            // Sauvegarde dans la base de données
            user.save()
        })
    }
    // Hash du mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        // Création du nouvel utilisateur
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
        })
        // Sauvegarde dans la base de données
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {
    // Recherche d'un utilisateur dans la base de données
    User.findOne({where: { email: req.body.email }})
    .then(user => {
        // Si l'utilisateur est inactif
        if(user.isActive === false ){return res.status(403).json({ error: 'Utilisateur supprimé !'})}
        // Si on ne trouve pas l'utilisateur       
        if(!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé !'})
        }
        // On compare le mot de passe de la requete avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                message: 'Utilisateur connecté !',
                userId: user.id,
                role: user.isAdmin,
                userName : user.userName,
                avatar : user.avatar,
                // Création d'un token pour sécuriser le compte de l'utilisateur
                token: jwt.sign(
                    { userId: user.id },
                    process.env.RND_TKN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(501).json({ error }));
    })
    .catch(error => res.status(502).json({ error }));
}; 