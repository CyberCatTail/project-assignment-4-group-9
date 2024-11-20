const { constants } = require('@root/constants');
const jwt = require('jsonwebtoken');

exports.verifyAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({error:{code: 401, detail: 'No token provided. Please log in.'} });
    }

    jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error:{code: 401, detail: 'No token provided. Please log in.'} });
        }

        req.userId = decoded.userId;
        next();
    });
};

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({error:{code: 401, detail: 'No token provided. Please log in.'} });
    }

    jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({error:{code: 401, detail: 'No token provided. Please log in.'} });
        }

        if (!decoded.isAdmin) {
            return res.status(403).json({error:{code: 403, detail: 'No permission.'} });
        }

        req.userId = decoded.userId;
        next();
    });
};
