const ENV = require('../config')
const User = require('../model/user-model')

const auth = async function(req, res, next){

    const _id = req.session._id
    if(_id){
        const user = await User.findOne({_id: _id})
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    }else {
        res.status(401).send({message: 'Unauthorized'})
    }

}

module.exports = auth