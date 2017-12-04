
module.exports = (app) => {
    require('./courseRoutes')(app);
    require('./moduleRoutes')(app);
    require('./quizRoutes')(app);
}
