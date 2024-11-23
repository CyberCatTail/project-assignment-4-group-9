const { constants } = require('@root/constants');
const { User} = require("@model/user");
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ where: { username } });
    
        if (!user) {
            user = await User.create({
                username: username,
                password: password,
                role: 2
                });
        } else if (password !== user.password) {
            res.status(401).json({error:{code: 500, detail: 'User Name or Password error'}, notice: {message: 'User Name or Password error'} });
            return;
        }
    
        const token = jwt.sign(
            { userId: user.id, isAdmin: user.role == 1 },
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
        res.json({notice: { message: `Welcome ${username}!` }});
      } catch (error) {
        res.status(500).json({error:{code: 500, detail: error}, notice: {message: 'login error'} });
      }
}