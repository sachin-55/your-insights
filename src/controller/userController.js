import User from '../model/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import cloudinary from 'cloudinary';

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Error Getting All Users',
    });
  }
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(new AppError('No documents found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates.PLease use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'fullname', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.uploadProfileImage = catchAsync(async (req, res, next) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log(`image = ${req.file.path}`);

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    resource_type: 'image',
    folder: 'profile',
    width: 1200,
    height: 1200,
    crop: 'fill',
    gravity: 'center',
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { photo: result.secure_url },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'profile image uploaded in cloud',
    result,
    user,
  });
});
