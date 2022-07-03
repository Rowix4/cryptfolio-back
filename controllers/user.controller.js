const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken')
const bCrypt = require ('bcrypt')

exports.login = async (req, res) => {

    try {
        const { mail, password } = req.query;

        if (!mail || !password) {
            res.status(400).json({ error: 'Mail or password not found' });
            return
        }

        const user = await User.findOne({mail}).select('+password');

        if (!user || !(await bCrypt.compare(password, user.password))) {
            res.status(400).json({ error: 'Wrong email or password' });
            return
        }

        const privateKey = process.env.PRIVATE_KEY;

        const token = jwt.sign({userID : user._id}, privateKey);

        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({ error: error });
    }

};

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
        res.status(201).json({ message: 'User create'});

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.profile = async (req,res) => {
    try{
        const {user} = req;
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error : "Cannot get profile" });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users: {users}});
    } catch (error) {
        res.status(500).json({ error : "Cannot get users" });

    }
}

exports.delete = async (req, res) => {
    try {
        const _id  = req.params.id;
        const user = await User.findOne({_id})
        if (!user) {
            res.status(400).json({error: 'User not found'})
            return
        }

        await User.deleteOne({_id});
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error:"Fail to delete this user" });
    }
}

exports.update = async (req, res) => {
    try{
        const _id  = req.params.id;
        const {_id : _, ...body} = req.body;

        await User.updateOne({_id},body)


        res.status(200).json();

    } catch (error) {
        res.status(500).json({ error: error });
    }
}


