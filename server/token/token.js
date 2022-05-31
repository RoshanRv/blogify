const {sign} = require('jsonwebtoken')

const getAccessToken = username =>{

    return sign({username},process.env.ACCESS_TOKEN,{
        expiresIn:'15m'
    })

}

const getRefreshToken = username =>{

    return sign({username},process.env.REFRESH_TOKEN,{
        expiresIn:'7d'
    })

}

module.exports = {
    getAccessToken,getRefreshToken
}