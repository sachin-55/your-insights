"use strict";

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _appError = _interopRequireDefault(require("../utils/appError"));

var _blogModel = _interopRequireDefault(require("../model/blogModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.uploadImage = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _cloudinary["default"].v2.config({
              cloud_name: process.env.CLOUDINARY_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });

            _context.next = 3;
            return _cloudinary["default"].v2.uploader.upload(req.file.path);

          case 3:
            result = _context.sent;
            // const result = {
            //   secure_url: `https://res.cloudinary.com/nihcas/image/upload/v1586781742/olh4cooqsh7xoieordz4.jpg`,
            // };
            res.status(200).json({
              status: 'success',
              message: 'file uploaded in cloud',
              result: result
            });

          case 5:
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
exports.uploadVideo = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _cloudinary["default"].v2.config({
              cloud_name: process.env.CLOUDINARY_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });

            _context2.next = 3;
            return _cloudinary["default"].v2.uploader.upload(req.file.path, {
              resource_type: 'video',
              width: 300,
              height: 200
            });

          case 3:
            result = _context2.sent;
            res.status(200).json({
              status: 'success',
              message: 'Video uploaded in cloud',
              result: result
            });

          case 5:
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
exports.uploadFile = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _cloudinary["default"].v2.config({
              cloud_name: process.env.CLOUDINARY_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET
            });

            _context3.next = 3;
            return _cloudinary["default"].v2.uploader.upload(req.file.path, {
              resource_type: 'raw' // resource_type: 'auto',  supporting for all kind of files types

            });

          case 3:
            result = _context3.sent;
            res.status(200).json({
              status: 'success',
              message: 'File uploaded in cloud',
              result: result
            });

          case 5:
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
exports.createBlog = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var blog;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _blogModel["default"].create({
              title: req.body.title,
              content: req.body.content,
              user: req.user._id
            });

          case 2:
            blog = _context4.sent;
            res.status(201).json({
              status: 'success',
              blog: blog
            });

          case 4:
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
exports.getAllBlogs = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var blogs;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _blogModel["default"].find().populate('user').select('+createdAt');

          case 2:
            blogs = _context5.sent;
            res.status(200).json({
              status: 'success',
              results: blogs.length,
              blogs: blogs
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.getBlog = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var blog;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _blogModel["default"].findById(req.params.blogId).populate('user').select('+createdAt');

          case 2:
            blog = _context6.sent;
            res.status(200).json({
              status: 'success',
              blog: blog
            });

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
exports.updateBlog = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
    var blog;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _blogModel["default"].findByIdAndUpdate(req.params.blogId, {
              title: req.body.title,
              content: req.body.content
            }, {
              "new": true,
              runValidators: true
            });

          case 2:
            blog = _context7.sent;
            res.status(200).json({
              status: 'success',
              blog: blog
            });

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
exports.deleteBlog = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
    var blog;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _blogModel["default"].findByIdAndDelete(req.params.blogId);

          case 2:
            blog = _context8.sent;
            res.status(200).json({
              status: 'success',
              message: 'Blog Deleted'
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());