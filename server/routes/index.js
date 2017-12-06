module.exports = (app) => {
    require('./authRoutes')(app);
    require('./chatRoutes')(app);
};
