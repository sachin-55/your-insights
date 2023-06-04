"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _commentController = _interopRequireDefault(require("../controller/commentController"));
var _authController = _interopRequireDefault(require("../controller/authController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', _commentController["default"].getAllComment);
router.get('/:postId', _commentController["default"].getCommentOfPost);
router.post('/', _authController["default"].protect, _commentController["default"].createCommentOnPost);
var _default = router;
exports["default"] = _default;