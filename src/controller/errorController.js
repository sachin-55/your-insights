import AppError from '../utils/appError';

const handleDublicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value:${value} Please use another value`;
  console.log('ERROR');

  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  if (error.code === 11000) error = handleDublicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    err: error,
    stack: error.stack,
  });
};
