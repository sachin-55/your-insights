"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose["default"].Schema({
  fullname: {
    type: String,
    required: [true, 'Please tell us your fullname.']
  },
  email: {
    type: String,
    required: [true, 'A user must provide email'],
    unique: true,
    lowercase: true,
    validate: [_validator["default"].isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  coverImage: {
    type: String
  },
  role: {
    type: String,
    "default": 'user',
    select: false
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //Works for save and create
      validator: function validator(value) {
        return value === this.password;
      },
      message: 'Passwords are not the same'
    }
  },
  createdAt: {
    type: Date,
    "default": Date.now(),
    select: false
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    "default": true,
    select: false
  }
});
userSchema.pre('save', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this.isModified('password')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next());

          case 2:
            _context.next = 4;
            return _bcryptjs["default"].hash(this.password, 12);

          case 4:
            this.password = _context.sent;
            this.confirmPassword = undefined;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(candidatePassword, userPassword) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(candidatePassword, userPassword);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.methods.changedPasswordAfter = function (JWTTimsStamp) {
  if (this.passwordChangedAt) {
    var changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimsStamp < changedTimeStamp;
  }
};

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;