"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appError = _interopRequireDefault(require("../utils/appError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleDublicateFieldsDB = function handleDublicateFieldsDB(err) {
  var value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  var message = "Duplicate field value:".concat(value, " Please use another value");
  console.log('ERROR');
  return new _appError["default"](message, 400);
};

var handleValidationErrorDB = function handleValidationErrorDB(err) {
  var errors = Object.values(err.errors).map(function (el) {
    return el.message;
  });
  var message = "Invalid input data. ".concat(errors.join('. '));
  return new _appError["default"](message, 400);
};

var _default = function _default(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  var error = _objectSpread({}, err);

  error.message = err.message;
  if (error.code === 11000) error = handleDublicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    err: error,
    stack: error.stack
  });
};

exports["default"] = _default;