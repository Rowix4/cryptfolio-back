module.exports = mongoose => {
    return mongoose.model(
        "User",
        mongoose.Schema(
            {
                firstname: { type: String },
                lastname: { type: String },
                mail: { type: String },
                password: { type: String, select: false },
                phone: { type: Number },
                registrationDate: { type: Number },
                isActive: { type: Boolean, default: false },
                role: { type: String },
                activationKey: { type: String },
                __v: { type: Number, select: false },
            },
            { timestamps: true }
        )
    );
};
