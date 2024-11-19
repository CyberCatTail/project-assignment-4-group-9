const { constants } = require('@root/constants');
const jwt = require('jsonwebtoken');
exports.login = (req, res) => {
    const { username, password } = req.body;

    // const user = 
    // if (!user) {
    //     return res.status(401).json({data: { message: 'User Name or Password error' }});
    // }
    const token = jwt.sign(
        { userId: 12345 },
        constants.JWT_SECRET,
        { expiresIn: '24h' }
    );
    res.cookie('jwt', token, {
        httpOnly: false,
        secure: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
    });
    res.json({data: { message: `Welcome ${username}!` }});
}