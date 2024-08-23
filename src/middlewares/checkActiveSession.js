const checkActiveSession = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user.activeSession !== req.token) {
        return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    next();
};
