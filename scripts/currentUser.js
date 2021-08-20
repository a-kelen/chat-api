var jwt = require('jsonwebtoken')

module.exports = function (req) {
    try {
        let token = req.headers.authorization.split(' ')[1]
        return jwt.verify(token, process.env.TOKEN_KEY).user_id
    } catch (error) {
    
    }
}