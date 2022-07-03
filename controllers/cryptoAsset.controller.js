const db = require("../models");
const CryptoAsset = db.cryptoAsset;

exports.add = async (req,res) => {
    try {
        const {identifier, name, buyDate, buyPrice, buyValue, portfolioId} = req.body;

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

        await CryptoAsset.updateOne({_id},body)

        res.status(200).json();
    } catch (error) {
        res.status(400).json({ error : "Cannot update asset with id " + _id });
    }
}

exports.get = async (req, res) => {
    try {
        const _id  = req.params.id;

        const asset = await CryptoAsset.findOnById
        res.status(200).json({ cryptoAsset: asset});
    } catch (error) {
        res.status(400).json({ error : "Cannot get asset with id " + _id });
    }
}

// TODO: CHECK IF USER AUTHENTIFIED IS SAME FOR THE RESSOURCE
// TODO: DELETE