const db = require("../models");
const CryptoAsset = db.cryptoAsset;
const Portfolio = db.portfolio;

exports.add = async (req,res) => {
    try {
        const {identifier, name, buyDate, buyPrice, buyValue, portfolioId} = req.body;
        const {user} = req;

        const portfolio = await Portfolio.findOne({ _id: asset.portfolioId });

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        const asset = new CryptoAsset({
            identifier, name, buyDate, buyPrice, buyValue, portfolioId
        });

        await asset.save()
        res.status(201).json({ message: 'Asset create'});

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

exports.update = async (req, res) => {
    try{
        const _id  = req.params.id;
        const {_id : _, ...body} = req.body;

        const {user} = req;

        const asset = await CryptoAsset.findOne({ _id });
        const portfolio = await Portfolio.findOne({ _id: asset.portfolioId });

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        await CryptoAsset.updateOne({_id},body)

        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error : "Cannot update asset with id " + _id });
    }
}

exports.get = async (req, res) => {
    try {
        const {user} = req;

        const _id  = req.params.id;

        const asset = await CryptoAsset.findOne({ _id });
        const portfolio = await Portfolio.findOne({ _id: asset.portfolioId });

        if (user._id != portfolio.userId) {
            res.status(401).json({ error : "Unauthorized"});
        }

        res.status(200).json({ cryptoAsset: asset});
    } catch (error) {
        res.status(400).json({ error : "Cannot get asset with id " + _id });
    }
}