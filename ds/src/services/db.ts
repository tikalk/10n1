import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function db() {
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PASS = process.env.DB_PASS || '';

  const DB_URL =
    process.env.NODE_ENV === 'production'
      ? `mongodb+srv://mongoose-access:${DB_PASS}@${DB_HOST}/10n1-production?retryWrites=true&w=majority`
      : `mongodb+srv://mongoose-access:${DB_PASS}@${DB_HOST}/10n1-development?retryWrites=true&w=majority`;

  console.warn(
    `💻 connecting to Mongo ${process.env.NODE_ENV || 'Development'}`,
  );
  try {
    await mongoose.connect(DB_URL, {
    });
  } catch (err) {
    console.log(err);
  }
  console.warn(
    `💻💻💻 connected to Mongo ${process.env.NODE_ENV || 'Development'}`,
  );
  return mongoose;
}

export default db;
