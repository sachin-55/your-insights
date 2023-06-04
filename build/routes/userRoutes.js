"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _authController = _interopRequireDefault(require("../controller/authController"));
var _multer = _interopRequireDefault(require("multer"));
var _appError = _interopRequireDefault(require("../utils/appError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var upload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new _appError["default"]('Not an image. Upload only Image', 400), false);
    }
  }
});
var router = _express["default"].Router();
router.post('/signup', _authController["default"].signup);
router.post('/login', _authController["default"].login);
router.get('/logout', _authController["default"].protect, _authController["default"].logout);
router.patch('/uploadProfileImage', _authController["default"].protect, upload.single('photo'), _userController["default"].uploadProfileImage);
router.patch('/updateMyPassword', _authController["default"].protect, _authController["default"].updatePassword);
router.patch('updateMyNameAndEmail', _authController["default"].protect, _userController["default"].updateUser);
router.route('/').get(_userController["default"].getAllUsers);
router.route('/:userId').get(_authController["default"].protect, _userController["default"].getUser);
var _default = router;
exports["default"] = _default;