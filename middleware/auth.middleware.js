const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({
        ok: false,
        error: 'Access denied. No token provided'
    })

    try{    
        req.user = jwt.verify(token,process.env.TOKEN_SECRET)
    }catch{
        return res.status(401).send({
            ok: false,
            error: 'Token expired'
        })
    }
    next();
}