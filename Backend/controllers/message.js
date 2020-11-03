//imports
const models = require("../models");
const Message = models.messages;
const User = models.users

const fs = require('fs');

// logique métier : lire tous messages
exports.findAllMessages = (req, res, next) => {
  Message.findAll({order: [
    ['id', 'DESC'],
]})
  .then(messages => {
      console.log(messages);
      res.status(200).json({data: messages});
  })
  .catch(error => res.status(400).json({ error }));
};

// logique métier : lire un message par son id
exports.findOneMessage = (req, res, next) => {
  Message.findOne({ where: {id: req.params.id} })
  .then(message => {
    console.log(message);
    res.status(200).json(message)
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