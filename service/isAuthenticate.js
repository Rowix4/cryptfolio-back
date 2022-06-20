const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;


exports.isAuthenticated  = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send();
        return;
    }
    const privateKey = process.env.PRIVATE_KEY;

    const bearer = authorization.replace(/^Bearer\s/, '');

    jwt.verify(bearer, privateKey, async (err, decoded) => {
        if (err || !decoded) {
            res.status(401).json({ errors: { code: 'INVALID_TOKEN' }, data: {} });
            return;
        }

        const user = await User.findOne({ _id : decoded.userID});

        if (!user) {
            res.status(401).json({ errors: { code: 'INVALID_TOKEN' }, data: {} });
            return;
        }

        req.user = user;
        next();
    });
};
