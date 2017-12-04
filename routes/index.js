
module.exports = (app) => {
    require('./authRoutes')(app);
    require('./courseRoutes')(app);
    require('./moduleRoutes')(app);
    require('./quizRoutes')(app);
    require('./lessonRoutes')(app);
}
