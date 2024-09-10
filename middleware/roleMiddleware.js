// server/middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');

const roleMiddleware = (requiredRole) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'Please authenticate' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== requiredRole) {
            return res.status(403).send({ error: 'Access denied' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

module.exports = roleMiddleware;
