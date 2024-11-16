exports.login = (req, res) => {
    const { username, password } = req.body;

    // const user = 
    // if (!user) {
    //     return res.status(401).json({data: { message: 'User Name or Password error' }});
    // }

    req.session.userId = 111;
    res.json({data: { message: 'Welcome' }});
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Logout failed' }});
        }
        res.json({data: { message: 'Logout succeed' }});
    });
}