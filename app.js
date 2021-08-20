require("dotenv").config();
require("./config/database").connect();
require('express-group-routes');
const { body } = require('express-validator');
const express = require("express");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


const userController = require('./controllers/UserController')
const chatController = require('./controllers/ChatController')

app.post("/register",
  body('first_name').notEmpty(),
  body('last_name').notEmpty(),
  body('nickname').notEmpty(),
  body('email').notEmpty(),
  body('password').notEmpty(),
  userController.regisger
);

app.post("/login", 
  body('email').notEmpty(),
  body('password').notEmpty(),
  userController.login
);
// app.group('/user', (router) => {
//   router.get('/all', userController.all)
//   router.get('/search', userController.search)
//   router.put('/edit', userController.edit)
//   router.post('/set-avatar', userController.setAvatar)
//   router.get('/block-user', userController.blockUser)
// });
// app.group('/chat', (router) => {
//   router.post('/clear', chatController.clear)
//   router.post('/create', chatController.create)
//   router.put('/edit', chatController.edit)
//   router.delete('/delete', chatController.delete)
//   router.post('/switch-subscribe', chatController.switchSubscribe)
//   router.post('/delete-user', chatController.deleteUser)
// });

let router = express.Router()
router.use(auth);
router.get('/all', userController.all)
router.get('/current', userController.current)
router.get('/search', userController.search)
router.put('/edit', userController.edit)
router.post('/set-avatar', userController.setAvatar)
router.get('/block-user', userController.blockUser)
app.use('/user', router); 

router = express.Router();
router.use(auth);
router.post('/clear', chatController.clear)
router.post('/create', chatController.create)
router.put('/edit', chatController.edit)
router.delete('/delete', chatController.delete)
router.post('/switch-subscribe', chatController.switchSubscribe)
router.post('/delete-user', chatController.deleteUser)
app.use('/chat', router); 

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;