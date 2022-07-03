module.exports = mongoose => {
    return mongoose.model(
        "Portfolio",
        mongoose.Schema(
            {
                name: { type: String },
                userId: { type: String },
                __v: { type: Number, select: false },
            },
            { timestamps: true }
        )
    );
};
