module.exports = (app) => {


    app.get('/api/users', (req, res) => {
        res.send("users");
    });
    
};