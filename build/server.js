"use strict";

require("@babel/polyfill");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: "".concat(__dirname, "/../config.env")
});

var DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

_mongoose["default"].connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB Connection Successful 👍 💯 ');
});

var PORT = process.env.PORT;

var server = _app["default"].listen(PORT, function () {
  console.log("Server running on PORT ".concat(PORT));
});