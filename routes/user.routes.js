const {isAuthenticated} = require("../service/isAuthenticate");
const {hasRole} = require("../service/hasRole");

module.exports = app => {
    const user = require("../controllers/user.controller")
    const restaurant = require("../controllers/restaurant.controller");

    const router = require("express").Router();

    router.post("/login", user.login);

    router.put("/", user.register);
    
    router.put('/:id', [isAuthenticated, hasRole(Role.ADMIN)], user.update)

    router.get('/me',[isAuthenticated] , user.profile);

    router.get('/all',[isAuthenticated, hasRole(Role.ADMIN)], user.getAllUser)

    router.delete('/:id',[isAuthenticated, hasRole(Role.ADMIN)], user.delete)

    app.use('/api/user', router)
}

class Role {
    static ADMIN = 'ROLE_ADMIN';
    static USER = 'ROLE_USER';
}
