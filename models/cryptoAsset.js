module.exports = mongoose => {
    return mongoose.model(
        "CryptoAsset",
        mongoose.Schema(
            {
                identifier: { type: String },
                name: { type: String },
                buyDate: { type: Date },
                buyPrice: { type: Number },
                buyValue: { type: Number },
                portfolioId: { type: Number },
                __v: { type: Number, select: false },
            },
            { timestamps: true }
        )
    );
};
