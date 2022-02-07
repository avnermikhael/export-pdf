const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const verifyJwt = (req, token) => {
    try {
        var decoded = jwt.verify(token, secret);
        // set userId into request
        req.app.locals.dokterId = decoded.dokterId
        req.app.locals.dokterNama = decoded.dokterNama
        req.app.locals.dokterTelp = decoded.dokterTelp
        return true
    } catch(err) {
        return false
    }
        return true
}

const getToken = (bearer) => {
    return bearer.slice(7, bearer.length)
}

const JwtFilter = (req, res, next) => {
    const jwt = req.header('auth-token')
    if(jwt !== null && jwt !== '') {
        if(verifyJwt(req, jwt)) {
            next()
        } else {
            res.status(401).send({
                'status': 401,
                'msg': 'Token is not valid'
            })
        }
    } else {
        res.status(401).send({
            'status': 401,
            'msg': 'Token is missing'
        })
    }
}

module.exports = { JwtFilter }
