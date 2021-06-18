import mongoose, { Mongoose } from "mongoose";

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("Please define mongo uri in the env");
}
interface ICached {
  conn: Mongoose | null;
  promise: Mongoose | null;
}
let cached: ICached = { conn: null, promise: null }; //= global?.mongoose;
if (!cached) {
  cached = { conn: null, promise: null };
}
async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };
    cached.promise = await mongoose
      .connect(mongoURI || "not available", opts)
      .then((mongoose: Mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
