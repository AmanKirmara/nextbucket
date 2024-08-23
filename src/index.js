import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ sserver is running at port : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Mongo db connection failed !!! ', err);
  });
