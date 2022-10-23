const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY;

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = "The authorization header is missing.";
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            const message = "The token is invalid.";
            return res.status(401).json({ message });
        }

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = "The user ID is invalid.";
            return res.status(401).json({ message });
        }else {
            next();
        }
    });
};
