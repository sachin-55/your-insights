import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../config.env` });

import app from './app';

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful 👍 💯 '));

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
