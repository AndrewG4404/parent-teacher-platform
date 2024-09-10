const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the header
    if (!token) {
        return res.status(401).send({ error: "Please authenticate." });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Authenticated user ID:", req.user._id); // Log the authenticated user ID
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).send({ error: "Please authenticate." });
    }
};

module.exports = { authMiddleware };
