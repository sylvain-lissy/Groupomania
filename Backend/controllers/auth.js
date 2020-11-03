// imports
const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require("../models");

// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (Post signup)
exports.signup = (req, res, next) => {
    // Hash du mot de passe avec bcrypt
    bcrypt.hash(req.body.user_password, 10)
    .then(hash => {
        // Création du nouvel utilisateur
        const user = new User({
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            user_password: hash,
            user_role:3,
            user_dateInscription: Date.now()
        })
        // Sauvegarde dans la base de données
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Création de connexion d'utilisateur enregistré (Post login)
exports.login = (req, res, next) => {
    // Recherche d'un utilisateur dans la base de données
    User.findOne({where: { user_email: req.body.user_email }})
    .then(user => {
        // Si on ne trouve pas l'utilisateur
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'})
        }
        // On compare le mot de passe de la requete avec celui de la base de données
        bcrypt.compare(req.body.user_password, user.user_password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                message: 'Utilisateur connecté !',
                userId: user.id,
                // Création d'un token pour sécuriser le compte de l'utilisateur
                token: jwt.sign(
                    { userId: user.id },
                    process.env.RND_TKN,
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 