import User from '../model/userModel';

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

exports.createUser = (req, res) => {};
