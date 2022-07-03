const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken')
//const fs = require('fs')
//const path = require('path')
const bCrypt = require ('bcrypt')
const tokenList = {}
const privateKey = process.env.PRIVATE_KEY;
const refreshKey = process.env.REFRESH_TOKEN;
const tokenExpire = process.env.TOKENLIFE;
const refreshTokenExpire = process.env.REFRESHTOKENLIFE;


exports.register = async (req,res) => {
    try {
        const {mail, password, firstname, lastname, role} = req.body;

        const userExists = await User.findOne({ mail });
        if (userExists != null) {
            res.status(400).json({ error:"User already exist" })
            return
        }

        const encryptedPassword = await bCrypt.hash(password, 15);

        const user = new User({
            mail, password : encryptedPassword, firstname, lastname, role
        });

        await user.save()
        res.status(201).json({ message: 'User save'});

    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.login = async (req, res) => {

    try {
        const { mail, password } = req.body;

        if (!mail || !password) {
            res.status(400).json({ error: 'Mail or PWD not found' });
            return
        }

         const user = await User.findOne({mail}).select('+password');

        if (!user || !(await bCrypt.compare(password, user.password))) {
            res.status(401).json({ error: 'Email ou mot de passe incorrect' });
            return
        }

       const token = jwt.sign({userId: user._id}, privateKey, {expiresIn: tokenExpire});
       const refreshTokenKey = jwt.sign({userId: user._id}, refreshKey, {expiresIn: refreshTokenExpire});
        const response = {
            "status": "Logged in",
            "token": token,
            "refreshTokenKey": refreshTokenKey,
            "user": user,
        }
        tokenList[refreshTokenKey] = response
        res.status(200).json({ response });

    } catch (error) {
        res.status(400).json({ error: error });
    }

};

exports.refreshToken = async (req, res) => {

  try {
      const {refreshTokenKey, mail} = req.body

      if((refreshTokenKey) && (refreshTokenKey in tokenList)){
          const user = await User.findOne({mail}).select('+password');
          const token = jwt.sign({userID : user._id}, privateKey, {expiresIn: tokenExpire });
          tokenList[refreshTokenKey].token = token
          res.status(200).json(token)
       }
  } catch (error) {
      res.status(500).json({ error: "Refresh token failed" });
  }

};

exports.checkToken = async (req,res, next)=> {
    try {
        const token =  req.body.token || req.query.token || req.header['x-access_token']

        if (token){
            jwt.verify(token, privateKey, function (err,decoded){
                if(err){
                    return res.status(401).json({"error": true, "message": 'Unauthorized access.'});
                }
                req.decoded = decoded;
                next();
            })
        }
    } catch(error){
        res.status(403).json({ error: "No Token probided" });
    }

};

exports.profile = async (req,res) => {
    try{
        const {user} = req;
        res.status(200).json({ user });

    } catch (error) {
        res.status(400).json({ error : "Cannot get profile" });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users: {users}});

    } catch (error) {
        res.status(400).json({ error : "Cannot get users" });

    }
}

exports.delete = async (req, res) => {
    try {
        const _id  = req.params.id;
        const user = await User.findOne({_id})
        if (!user) {
            res.status(400).json({error: 'User not found for delete.'})
            return
        }

        await User.deleteOne({_id});
        res.status(204).send();

    } catch (error) {
        res.status(400).json({ error:"Fail to delete this user" });
    }
}

exports.update = async (req, res) => {
    try{
        const _id  = req.params.id;
        const {_id : _, ...body} = req.body;

        await User.updateOne({_id},body)


        res.status(200).json();

    } catch (error) {
        res.status(400).json({ error : "Cannot update User" });
    }
}

exports.history = async (req, res) => {
    try {
        const {user} = req;

        user.history.forEach( (past, index) => {
            if (past === req.params.id) {
                user.history.splice(index, 1);
                // TODO : check if getHistory is order by ID, and check for push an update with new order
                console.log(user.history)
                res.status(201).send();

            }
        });

        const update = await User.updateOne({_id : user._id}, {
            $push: {history :  req.params.id,  $position : 0 },
            $inc: { __v: 1 },
        });

        res.status(200).send();

    } catch (err) {
        res.status(400).json({ error : "Cannot add history" });
    }

}

