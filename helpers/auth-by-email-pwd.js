const USERS_BBDD = require("../bbdd")

function authByEmailPwd(email, password) {
    const user = USERS_BBDD.find(u => u.email === email)

    if (!user) throw new Error()

    if (user.password !== password) throw new Error()

    return user

}

module.exports = authByEmailPwd