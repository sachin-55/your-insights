"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var blogSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: [true, 'Blog must have a title.']
  },
  content: {
    type: String,
    required: [true, 'There is no Blog 😉']
  },
  createdAt: {
    type: Date,
    "default": Date.now(),
    select: false
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Blog = _mongoose["default"].model('Blog', blogSchema);

var _default = Blog;
exports["default"] = _default;