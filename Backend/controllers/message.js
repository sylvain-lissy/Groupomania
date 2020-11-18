//imports
const db = require("../models");
const models = require("../models");
const Message = models.messages;
const Comment = models.comments;
const User = models.users

const fs = require('fs');
//const { join } = require("path");

// logique métier : lire tous messages
exports.findAllMessages = (req, res, next) => {
  Message.findAll({
    include: 
      {
        model: User,
        required: true,
        attributes:['userName','avatar']
      },
    order:[['id','DESC']]
  })
  .then(messages => {
      const ListeMessages = messages.map(message => {
        return Object.assign({},
          {
            msgId: message.id,
            msgDate: message.createdAt,
            msgTxt: message.message,
            msgImg: message.messageUrl,
            msgUID: message.UserId,
            msgUsr: message.User.userName,
            msgIcn: message.User.avatar
          }
        )
      });
      res.status(200).json({ListeMessages});
  })
  .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un message par son id
exports.findOneMessage = (req, res, next) => {
  const OnlyOneMessage = {}
  Message.findOne({ 
    where: {id: req.params.id},
    include: {
      model: User,
      required: true,
      attributes:['userName','avatar'] 
    }
  })
  .then(message => {
      OnlyOneMessage.id = message.id
      OnlyOneMessage.userID = message.UserId
      OnlyOneMessage.userAvatar = message.User.avatar
      OnlyOneMessage.userName = message.User.userName
      OnlyOneMessage.date = message.createdAt
      OnlyOneMessage.text = message.message
      OnlyOneMessage.image = message.messageUrl
  })
  .then(() => {
    Comment.count({ where: {MessageId: req.params.id} })
    .then(commentCount => {
      OnlyOneMessage.Commentaire = commentCount
      res.status(200).json(OnlyOneMessage)
    })
  })
  .catch(error => res.status(404).json({ error }));
};

// logique métier : créer un message
exports.createMessage = (req, res, next) => {

  // Création d'un nouvel objet message
  let varImage =""
  if (req.file) { varImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
  const message = new Message(
    {
      UserId: req.body.UserId,
      message: req.body.message,
      messageUrl: varImage
    }
  )
  // Enregistrement de l'objet message dans la base de données
  message.save()
    .then((retour) => res.status(201).json({message: `Message créé !`, retour}))
    .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un message
exports.modifyMessage = (req, res, next) => {
  const messageObject = req.file ?
    {
      ...req.body.message,
      messageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ... req.body};

  Message.update({ ...messageObject, id:  req.params.id}, { where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Message modifié !'}))
  .catch(error => res.status(400).json({ error }));
};

// Logique métier : supprimer un message
exports.deleteMessage = (req, res, next) => {
  Message.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Message supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};