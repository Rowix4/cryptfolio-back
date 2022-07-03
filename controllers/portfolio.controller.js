const db = require("../models");
const Portfolio = db.portfolio;
const User = db.user;

exports.add = async (req,res) => {
    try {
        const {userId, name} = req.body;

        const portfolioExist = await Portfolio.findOne({ name });
        if (portfolioExist != null) {
            res.status(400).json({ error:"Portfolio already exist" })
            return
        }

        const userExist = await User.findOne({ _id: userId })
        if (userExist == null) {
            res.status(400).json({ error:"User not found" })
            return
        }

        const portfolio = new Portfolio({
            name, userId
        });

        await portfolio.save()
        res.status(201).json({ message: 'Portfolio create'});

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

exports.update = async (req, res) => {
    try{
        const _id  = req.params.id;
        const {_id : _, ...body} = req.body;

        await Portfolio.updateOne({_id},body)

        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error : "Cannot update portfolio with id " + _id });
    }
}

exports.get = async (req, res) => {
    try {
        const _id  = req.params.id;

        const portfolio = await Portfolio.findOne({ _id });
        res.status(200).json({ portfolio: portfolio});
    } catch (error) {
        res.status(400).json({ error : "Cannot get portfolio with id " + _id });
    }
}

exports.delete = async (req, res) => {
    try {
        const _id  = req.params.id;
        const portfolio = await Portfolio.findOne({_id})
        if (!portfolio) {
            res.status(400).json({error: 'Portfolio not found'})
            return
        }

        await Portfolio.deleteOne({_id});
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error:"Fail to delete this user" });
    }
}

exports.getAllForUser = async (req, res) => {
    try {
        const {user} = req;

        const portfolio = await Portfolio.find({}).select({ "userId": user._id, "_id": 0});
        res.status(200).json({ portfolio: portfolio});
    } catch (error) {
        res.status(400).json({ error : "Cannot get portfolio with id " + _id });
    }
}

// TODO: CHECK IF USER AUTHENTIFIED IS SAME FOR THE RESSOURCE
// TODO: ADD FAVORITE