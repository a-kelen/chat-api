const bcrypt = require("bcryptjs")
const User = require("../model/User")
const jwt = require("jsonwebtoken")
const { validationResult  } = require('express-validator');
const currentUser = require("../scripts/currentUser");

 

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
        
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const user = await User.findOne({ email });
        
            if (user && (await bcrypt.compare(password, user.password))) {
              const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "10d",
                }
              );
        
              user.token = token;
        
              res.status(200).json(user);
            }
            res.status(400).send("Invalid Credentials");
          } catch (err) {
            console.log(err);
          }
    },

    async regisger(req, res) {
        try {
            const { first_name, last_name, nickname, email, password } = req.body;
              
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
        
            const oldUser = await User.findOne({ email });
        
            if (oldUser) {
              return res.status(409).send("User Already Exist. Please Login");
            }
        
            encryptedPassword = await bcrypt.hash(password, 10);
        
            const user = await User.create({
              first_name,
              last_name,
              nickname,
              email: email.toLowerCase(), 
              password: encryptedPassword,
            });
        
            const token = jwt.sign(
              { user_id: user._id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "10d",
              }
            );
            user.token = token;
        
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
        }
    },

    async edit(req, res) {
      try {
        const user = await Chat.findOneAndUpdate(
          { _id: currentUser(req) },
          req.body,
          { new: true }
        )
  
        res.json(user)
      } catch (error) {
        
      }
    },
    
    async setAvatar(req, res) {

    },

    async blockUser (req, res) {
      try {
        const current = await User.findById(currentUser(req))
        const user = await User.findById(req.body.id)
        if(!current.block_list.includes(user._id))
           current.block_list.push(user._id)
        else
          current.block_list.remove(user._id)
        await current.save()

        res.status(200).send(current.block_list.includes(user._id))
      } catch (error) {
        res.status(408).send()
      }
    },

    async search(req, res) {
      try {
        let data = await User.find({ $text : { $search : req.body.searchString }})
        res.status(200).json(data)
      } catch (error) {
        res.status(405).send()
      }
    },

    async current(req, res) {
      res.status(200).json(currentUser(req))
    },

    async all(req, res) {
      let data = await User.find({})
      res.status(200).json(data)
    }
}