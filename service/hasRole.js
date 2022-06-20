exports.hasRole = (role) =>
    (req, res, next) => {
        const { user } = req
        if (user.role !== role) {
            res.status(401).json({ errors: { code: 'UNAUTHORIZED_ACTION' }});
            return
        }
        next()
}
