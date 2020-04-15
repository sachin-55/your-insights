"use strict";

var _userModel = _interopRequireDefault(require("../model/userModel"));

var _util = require("util");

var _appError = _interopRequireDefault(require("../utils/appError"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signToken = function signToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var createSendToken = function createSendToken(user, statusCode, req, res) {
  var token = signToken(user._id);
  res.cookie('jwtToken', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true // secure: req.secure || req.headers('x-forwarded-proto') === 'https',

  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user
    }
  });
};

exports.signup = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var newUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel["default"].create({
              fullname: req.body.fullname,
              email: req.body.email,
              password: req.body.password,
              confirmPassword: req.body.confirmPassword
            });

          case 2:
            newUser = _context.sent;
            createSendToken(newUser, 201, req, res);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.login = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body, email, password, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (!(!email || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next(new _appError["default"]('Please provide email and password !', 400)));

          case 3:
            _context2.next = 5;
            return _userModel["default"].findOne({
              email: email
            }).select('+password');

          case 5:
            user = _context2.sent;
            _context2.t0 = !user;

            if (_context2.t0) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return user.correctPassword(password, user.password);

          case 10:
            _context2.t0 = !_context2.sent;

          case 11:
            if (!_context2.t0) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", next(new _appError["default"]('Incorrect email or password', 401)));

          case 13:
            createSendToken(user, 200, req, res);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.logout = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.cookie('jwtToken', 'looggeeout', {
              expires: new Date(Date.now() + 10 * 1000),
              httpOnly: true
            });
            res.status(200).json({
              status: 'success',
              token: 'loggedout'
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
exports.protect = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var token, decoded, currentUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
              token = req.headers.authorization.split(' ')[1];
            } else if (req.cookies.jwtToken) {
              token = req.cookies.jwtToken;
            }

            if (token) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", next(new _appError["default"]('You are not logged in. Please login to get access', 401)));

          case 3:
            _context4.next = 5;
            return (0, _util.promisify)(_jsonwebtoken["default"].verify)(token, process.env.JWT_SECRET);

          case 5:
            decoded = _context4.sent;
            _context4.next = 8;
            return _userModel["default"].findById(decoded.id);

          case 8:
            currentUser = _context4.sent;

            if (currentUser) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", next(new _appError["default"]('The user belonging to the token no longer exist', 401)));

          case 11:
            if (!currentUser.changedPasswordAfter(decoded.iat)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", next(new _appError["default"]('User recently changed password! Please log in again!!', 401)));

          case 13:
            req.user = currentUser;
            next();

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());