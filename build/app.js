"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _appError = _interopRequireDefault(require("./utils/appError"));

var _errorController = _interopRequireDefault(require("./controller/errorController"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _blogRoutes = _interopRequireDefault(require("./routes/blogRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //Global Middlewares

app.use((0, _cors["default"])({
  credentials: true
}));
app.options('*', (0, _cors["default"])()); // if (process.env.NODE_ENV === 'development') {

app.use((0, _morgan["default"])('dev')); // }
//body parser

app.use(_bodyParser["default"].json({
  limit: '10kb'
}));
app.use(_bodyParser["default"].urlencoded({
  inflate: true,
  extended: true,
  limit: '10kb'
}));
app.use((0, _cookieParser["default"])()); //Routes

app.use('/api/users', _userRoutes["default"]);
app.use('/api/blogs', _blogRoutes["default"]);
app.all('*', function (req, res, next) {
  next(new _appError["default"]("Can't find ".concat(req.originalUrl, " on this server!!"), 404));
});
app.use(_errorController["default"]);
module.exports = app;