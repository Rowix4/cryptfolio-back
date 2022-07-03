const db = require("../models");
const Portfolio = db.portfolio;
const User = db.user;

exports.add = async (req,res) => {
    try {
        const {user} = req;

        const {name} = req.body;

        const portfolioExist = await Portfolio.findOne({ name, userId: user._id });
        if (portfolioExist != null) {
            res.status(400).json({ error:"Portfolio already exist" })
            return
        }

        const portfolio = new Portfolio({
            name, userId: user._id
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

        const {user} = req;
        const portfolio = await Portfolio.findOne({ _id });

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        await Portfolio.updateOne({_id},body)

        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error : "Cannot update portfolio with id " + req.params.id });
    }
}

exports.get = async (req, res) => {
    try {
        const _id  = req.params.id;
        const {user} = req;

        const portfolio = await Portfolio.findOne({ _id });

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        res.status(200).json({ portfolio: portfolio});
    } catch (error) {
        res.status(400).json({ error : "Cannot get portfolio with id " + req.params.id });
    }
}

exports.delete = async (req, res) => {
    try {
        const _id  = req.params.id;
        const {user} = req;

        const portfolio = await Portfolio.findOne({_id})
        if (!portfolio) {
            res.status(400).json({error: 'Portfolio not found'})
            return
        }

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        await Portfolio.deleteOne({_id});
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error:"Fail to delete this portfolio" });
    }
}

exports.getAllForUser = async (req, res) => {
    try {
        const {user} = req;

        const portfolio = await Portfolio.find({}).select({ "userId": user._id, "_id": 0});
        res.status(200).json({ portfolio: portfolio});
    } catch (error) {
        res.status(400).json({ error : "Cannot get user portfolios"});
    }
}

// TODO: ADD FAVORITE