const {isAuthenticated} = require("../service/isAuthenticate");
const {hasRole} = require("../service/hasRole");

module.exports = app => {
    const portfolio = require("../controllers/portfolio.controller")
    const router = require("express").Router();

    router.post("/", [isAuthenticated, hasRole(Role.USER)], portfolio.add);
    
    router.put('/:id', [isAuthenticated, hasRole(Role.USER)], portfolio.update)

    router.get('/:id',[isAuthenticated, hasRole(Role.ADMIN)], portfolio.get)

    app.use('/api/portfolio', router)
}

class Role {
    static ADMIN = 'ROLE_ADMIN';
    static USER = 'ROLE_USER';
  }