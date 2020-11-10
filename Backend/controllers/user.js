// imports
const db = require("../models");
const User = db.users;
const Message = db.messages;
const Comment = db.comments;

const fs = require('fs');

// logique métier : lire tous utilisateurs
exports.findAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        console.log(users);
        res.status(200).json({data: users});
    })
    .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
const userInfo = {}

  User.findOne({ where: {id: req.params.id} })
  .then(user => {
    userInfo.name = user.user_name
    userInfo.mail = user.user_email
    userInfo.date = user.user_dateInscription
    userInfo.avatar = user.user_avatar
  })
  .then(() => {
    Comment.count({ where: {comment_user: req.params.id} })
    .then(commentCount => {
      userInfo.cmtcount = commentCount
    })
  })
  .then(() => {
    Message.count({ where: {userID: req.params.id} })
    .then(messageCount => {
      userInfo.msgcount = messageCount
      res.status(200).json(userInfo)
    })
  })
  
  
  .catch(error => res.status(404).json({ error }));
};

// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  // gestion d'ajout/modification image de profil
  const userObject = req.body.imageUrl ?
    {
      ...req.body.user,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`
    } : { ... req.body};

  User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  User.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};