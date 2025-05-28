// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ message: 'Unauthorized: Invalid token' });
            } else {
                req.user = decodedToken.id; // store user ID in request
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

module.exports = { requireAuth };
