//imports
const db = require("../models");
const models = require("../models");
const Message = models.messages;
const Comment = models.comments;
const User = models.users

//const fs = require('fs');
//const { join } = require("path");
//const message = require("../models/message");

// logique métier : lire tous messages
exports.findAllMessages = (req, res, next) => {
  Message.findAll({
    include: 
      {
        model: User,
        required: true,
        attributes:['user_name','user_avatar']
      },
    order:[['id','DESC']]
    
  })
  .then(messages => {
      //console.log(messages)
      const ListeMessages = messages.map(message => {
        return Object.assign({},
          {
            msgId: message.id,
            msgDate: message.message_date.split('-').reverse().join('/'),
            msgTxt: message.message_content,
            msgImg: message.message_image,
            msgUID: message.userID,
            msgUsr: message.User.user_name,
            msgIcn: message.User.user_avatar
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
      attributes:['user_name','user_avatar'] 
    }
  })
  .then(message => {
      OnlyOneMessage.id = message.id
      OnlyOneMessage.userID = message.UserId
      OnlyOneMessage.userAvatar = message.User.user_avatar
      OnlyOneMessage.userName = message.User.user_name
      OnlyOneMessage.date = message.message_date.split('-').reverse().join('/')
      OnlyOneMessage.text = message.message_content
      OnlyOneMessage.image = message.message_image
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
  const messageObject = req.body;
  // Création d'un nouvel objet message
  const message = new Message(
    req.body.message_image ? 
      {
        ...messageObject,
        // Création de l'URL de l'image : http://localhost:8080/images/nomdufichier 
        message_image: `${req.protocol}://${req.get('host')}/images/${req.body.message_image}`
      } : { ...messageObject});
      
  // Enregistrement de l'objet message dans la base de données
  message.save()
    .then(() => res.status(201).json({ message: 'Message créé !'}))
    .catch(error => res.status(400).json({ error }));
}

// logique métier : modifier un message
exports.modifyMessage = (req, res, next) => {
  const messageObject = req.body.message_image ?
    {
      ...req.body.message,
      message_image: `${req.protocol}://${req.get('host')}/images/${req.body.message_image}`
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