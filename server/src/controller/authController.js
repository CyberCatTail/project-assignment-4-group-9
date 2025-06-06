const constants = require('@root/constants');
const { User } = require("@model/user");
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({
                email: email,
                password: password,
                role: 2
            });
        } else if (password !== user.password) {
            res.status(401).json({ error: { code: 500, detail: 'User Name or Password error' }, notice: { message: 'User Name or Password error' } });
            return;
        }

        const token = jwt.sign(
            { userId: user.id, email: email, isAdmin: user.role == 1 },
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
        res.json({ notice: { message: `Welcome ${email.split('@')[0]}!` } });
    } catch (error) {
        res.status(500).json({ error: { code: 500, detail: error }, notice: { message: 'login error' } });
    }
}

exports.updatePassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.userId;
    try {
        const [updated] = await User.update(
            { password: password },
            {
                where: { id: userId },
            }
        );

        if (updated) {
            res.json({ notice: { message: 'Password Changed!' } });
        } else {
            res.status(500).json({ error: { code: 500, detail: "password update error" }, notice: { message: 'password update error' } });
        }
    } catch (error) {
        res.status(500).json({ error: { code: 500, detail: error }, notice: { message: 'password update error' } });
    }
}