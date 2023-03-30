const roles = require('../models/users/role.enum')


// ************* Middleware roles for user *************
module.exports.internaute = (req,res,next) => {
    if(req.user)
        if(req.user.role.toLowerCase()  == roles.internaute)
            next();
        else
            return res.status(403).send({
                ok: false,
                error: "access denied"
            });
    else
        return res.status(403).send({
            ok: false,
            error: "you are not authenticated"
        }); 
}

module.exports.publique = (req,res,next) => {
    if(req.user)
        if(req.user.role.toLowerCase()  == roles.publique)
            next();
        else
            return res.status(403).send({
                ok: false,
                error: "access denied"
            });
    else
        return res.status(403).send({
            ok: false,
            error: "you are not authenticated"
        }); 
}

module.exports.admin = (req,res,next) => {
    console.log('(req.user.role.toLowerCase()  == roles.admin) ',req.user ,'/////', roles.admin)
    if(req.user)
        if(req.user.role.toLowerCase()  == roles.admin)
            next();
        else
            return res.status(403).send({
                ok: false,
                error: "access denied"
            });
    else
        return res.status(403).send({
            ok: false,
            error: "you are not authenticated"
        }); 
}