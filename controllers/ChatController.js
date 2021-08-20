const Chat = require('../model/Chat')
const User = require("../model/User")
const currentUser = require('../scripts/currentUser')
module.exports = {
    async getChats(req, res) {
        try {
            const current = await User.findById(currentUser(req))
            res.json(current.chats)
        } catch (error) {
            
        }
    },
    
    async create(req, res) {
        try {
            const { name } = req.body
            const userId = currentUser(req)
            res.json(await Chat.create({ name, author: userId }))
        } catch (error) {
            res.status(409).json({ error : 'Already exists'})   
        }
    },

    async delete(req, res) {
        try {
            const current = await User.findById(currentUser(req))
            const chat = await Chat.findById(req.body.chatId)
            if(chat.author !== current._id)
                res.status(403).send()

            await Chat.deleteOne({ _id: req.body.chatId })
            res.status(200).send()
        } catch (error) {
            
        }
    },

    async clear(req, res) {
      try {
        const current = await User.findById(currentUser(req))
        const chat = await Chat.findById(req.body.chatId)
        let el = await current.chats.find({ chat: chat._id })
        el.clear_point = Date.now()
        await current.save()
        res.status(200).send()
      } catch (error) {
          
      } 
    },

    async edit(req, res) {
        try {
            const chat = await Chat.findOneAndUpdate(
                { _id: req.body.id },
                { name: req.body.name },
                { new: true}
            )
    
            res.json(chat)
        } catch (error) {
            
        }
    },

    async setAvatar(req, res) {

    },

    async deleteUser(req, res) {
        try {
            const current = await User.findById(currentUser(req))
            const user = await User.findById(req.body.userId)
            const chat = await Chat.findById(req.body.chatId)

            if(chat.author !== current._id)
                res.status(403).send()

            chat.block_list.push(user._id)
            await chat.save()
            res.status(200).send(chat.block_list.includes(user._id))
          } catch (error) {
            res.status(408).send()
          }
    },

    async switchSubscribe(req, res) {
        try {
            const current = await User.findById(currentUser(req))
            const chat = await Chat.findById(req.body.chatId)
            if(chat.members.filter(x => x == current._id)) {
                chat.members = chat.members.filter(x => x != current._id)
                current.chats = current.chats.filter(x => x != chat._id)
            } else {
                chat.members.push(current._id)
                current.chats.push(chat._id)
            }

            current.save()
            chat.save()
        } catch (error) {
            
        }
    }
}