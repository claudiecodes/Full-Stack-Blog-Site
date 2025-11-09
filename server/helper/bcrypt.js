const bcrypt = require('bcryptjs')

const hashPass = (password, salt)=>{
    return bcrypt.hashSync(password, salt)
}

const comparePass = (password, hashedPass)=>{
    return bcrypt.compareSync(password, hashedPass)
}

module.exports = {hashPass, comparePass}