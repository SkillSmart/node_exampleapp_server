
module.exports = (app) => {
    require('./courseRoutes')(app);
    require('./moduleRoutes')(app);
}
