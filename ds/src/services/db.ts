import mongoose from 'mongoose';

async function db() {
  const DB_HOST = 'production.lrcec.mongodb.net';
  const DB_PASS = 'J*9N2qKW.6$Th.X';

  const DB_URL =
    process.env.NODE_ENV === 'production'
      ? `mongodb+srv://mongoose-access:${DB_PASS}@${DB_HOST}/10n1-production?retryWrites=true&w=majority`
      : `mongodb+srv://mongoose-access:${DB_PASS}@${DB_HOST}/10n1-development?retryWrites=true&w=majority`;

  console.warn(
    `💻 connecting to Mongo ${process.env.NODE_ENV || 'Development'}`,
  );
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
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
