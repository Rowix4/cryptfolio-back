const {isAuthenticated} = require("../service/isAuthenticate");
const {hasRole} = require("../service/hasRole");

module.exports = app => {
    const cryptoAsset = require("../controllers/cryptoAsset.controller")
    const router = require("express").Router();

    router.post("/", [isAuthenticated, hasRole(Role.USER)], cryptoAsset.add);
    
    router.put('/:id', [isAuthenticated, hasRole(Role.USER)], cryptoAsset.update)

    router.get('/:id',[isAuthenticated, hasRole(Role.USER)], cryptoAsset.get)

    app.use('/api/cryptoAsset', router)
}

class Role {
    static ADMIN = 'ROLE_ADMIN';
    static USER = 'ROLE_USER';
  }