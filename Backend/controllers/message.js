const models = require("../models")
const Message = models.messages
const Comment = models.comments
const User = models.users

// Tous les messages
exports.findAllMessages = (req, res, next) => {
    Message.findAll({
        include: {
            model: User,
            required: true,
            attributes: ["userName", "avatar", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(messages => {
        const ListeMessages = messages.map(message => {
            return Object.assign({},
                {
                    id: message.id,
                    createdAt: message.createdAt,
                    message: message.message,
                    messageUrl: message.messageUrl,
                    UserId: message.UserId,
                    userName: message.User.userName,
                    avatar: message.User.avatar,
                    isActive: message.User.isActive
                }
            )
        })
        res.status(200).json({ ListeMessages })
    })
    .catch(error => res.status(400).json({ error }))
}

// Tous les messages d'un utilisateur
exports.findAllMessagesForOne = (req, res, next) => {
    Message.findAll({
        where: { UserId: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["userName", "avatar", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(messages => {
        const ListeMessages = messages.map(message => {
            return Object.assign({},
                {
                    id: message.id,
                    createdAt: message.createdAt,
                    message: message.message,
                    messageUrl: message.messageUrl,
                    UserId: message.UserId,
                    userName: message.User.userName,
                    avatar: message.User.avatar,
                    isActive: message.User.isActive
                }
            )
        })
        res.status(200).json({ ListeMessages })
    })
    .catch(error => res.status(400).json({ error }))
}

// Un seul message
exports.findOneMessage = (req, res, next) => {
    const oneMessage = {}
    Message.findOne({ 
        where: { id: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["userName", "avatar", "isActive"] 
        }
    })
    .then(message => {
        oneMessage.id = message.id
        oneMessage.userId = message.UserId
        oneMessage.avatar = message.User.avatar
        oneMessage.userName = message.User.userName
        oneMessage.isActive = message.User.isActive
        oneMessage.createdAt = message.createdAt
        oneMessage.message = message.message
        oneMessage.messageUrl = message.messageUrl
    })
    .then(() => {
        Comment.count({ where: { MessageId: req.params.id }})
        .then(commentCount => {
            oneMessage.commentaire = commentCount
            res.status(200).json(oneMessage)
        })
    })
    .catch(error => res.status(404).json({ error }))
}

// Créer un message
exports.createMessage = (req, res, next) => {
    let varImage =""
    if (req.file) { varImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
    const message = new Message(
        {
            UserId: req.body.UserId,
            message: req.body.message,
            messageUrl: varImage
        }
    )
    message.save()
        .then((retour) => res.status(201).json({ message: "Message créé !" }))
        .catch(error => res.status(400).json({ error }))
}

// Modifier un message
exports.modifyMessage = (req, res, next) => {
    const messageObject = req.file ?
      {
        ...req.body.message,
        messageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } : { ... req.body}

    Message.update({ ...messageObject, id:  req.params.id}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Message modifié !" }))
    .catch(error => res.status(400).json({ error }))
}

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
  Message.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Message supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}