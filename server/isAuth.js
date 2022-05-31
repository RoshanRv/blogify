const {verify} = require('jsonwebtoken')

const isAuth = (req)=>{

    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]

    const {username} = verify(token,process.env.ACCESS_TOKEN,)
    return username

}

module.exports = {
    isAuth
}