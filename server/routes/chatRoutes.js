module.exports = (app) => {
    
    app.get('/api/chats', (req, res) => {
        res.send('chats');
    });

    
};