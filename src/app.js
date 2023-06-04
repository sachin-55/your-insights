import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import AppError from './utils/appError';
import globalErrorHandler from './controller/errorController';

import userRouter from './routes/userRoutes';
import blogRouter from './routes/blogRoutes';
import commentRouter from './routes/commentRoutes';

const app = express();

//Global Middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.options('*', cors());

// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

//body parser
app.use(bodyParser.json({ limit: '10kb' }));
app.use(
  bodyParser.urlencoded({ inflate: true, extended: true, limit: '10kb' })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(
    'Hi! Welcome to Yours-Insights <br> Share yours views, ideas, knowledge, experience'
  );
});
//Routes
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
