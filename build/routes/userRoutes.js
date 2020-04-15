"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controller/userController"));

var _authController = _interopRequireDefault(require("../controller/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', _authController["default"].signup);
router.post('/login', _authController["default"].login);
router.get('/logout', _authController["default"].protect, _authController["default"].logout);
router.route('/').get(_userController["default"].getAllUsers).post(_userController["default"].createUser);
var _default = router;
exports["default"] = _default;