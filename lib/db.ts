import mongoose from 'mongoose';

const MONGO_URI: any = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
};

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null }
};

const db = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
      return mongoose
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default db;