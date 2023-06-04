"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _blogController = _interopRequireDefault(require("../controller/blogController"));
var _authController = _interopRequireDefault(require("../controller/authController"));
var _multer = _interopRequireDefault(require("multer"));
var _appError = _interopRequireDefault(require("../utils/appError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var upload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage({}),
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video') || file.mimetype.startsWith('application') || file.mimetype.startsWith('text')) {
      cb(null, true);
    } else {
      cb(new _appError["default"]('Not an image or video | Please upload only image and video', 400), false);
    }
  }
});
var router = _express["default"].Router();
router.get('/public', _blogController["default"].getAllBlogsForAll);
router.route('/').get(_authController["default"].protect, _blogController["default"].getAllBlogs).post(_authController["default"].protect, _blogController["default"].createBlog);
router.route('/:blogId').get(_blogController["default"].getBlog).patch(_authController["default"].protect, _blogController["default"].updateBlog)["delete"](_authController["default"].protect, _blogController["default"].deleteBlog);
router.post('/uploadImage', _authController["default"].protect, upload.single('file'), _blogController["default"].uploadImage);
router.post('/uploadVideo', _authController["default"].protect, upload.single('file'), _blogController["default"].uploadVideo);
router.post('/uploadFile', _authController["default"].protect, upload.single('file'), _blogController["default"].uploadFile);
var _default = router;
exports["default"] = _default;