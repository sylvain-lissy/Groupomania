// imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./middleware/auth');
const multer = require('./middleware/multer-config');

// import des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');

// lancement de l'application express
const app = express();

// gestion CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// appel des models dans la DB
const db = require("./models");
db.sequelize.sync();

// enregistrement des routeurs
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/users', auth, multer, userRoutes);
app.use('/api/messages', auth, multer, messageRoutes);
app.use('/api/comments', auth, commentRoutes);

// export de notre app
module.exports = app;