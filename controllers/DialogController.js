const currentUser = require('../scripts/currentUser')
const Dialog = require('../model/Dialog')
const User = require("../model/User")
module.exports = {
    async create(req, res) {
        
        try {
            const { userId } = req.body
            let currentUser = User.findById(currentUser(req))
            let user = User.findById(userId)
            if(!user)
                res.status(404).send()
            let dialog = new Dialog()
            dialog.left_user = user;
            res.json(await Chat.create({ left_user: currentUser._id, right_user = userId }))
        } catch (error) {
            res.status(409).json({ error : 'Already exists'})   
        }
    },

    async delete(req, res) {
        try {
            const { userId } = req.body
            let currentUser = User.findById(currentUser(req))
            let user = User.findById(userId)
            if(!user)
                res.status(404).send()

            await Dialog.deleteOne({ right_user: userId })
            res.status(200).send()
        } catch (error) {
            
        }
    },

    async clear(req, res) {
        try {
            const current = await User.findById(currentUser(req))
            const dialog = await Dialog.findById(req.body.dialogId)
            dialog.clear_point = Date.now()
            await dialog.save()
            res.status(200).send()
        } catch (error) {
              
        } 
    },

    

}