import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;
async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: dbName,
        });
        console.log(`Pinged your deployment. You successfully connected to MongoDB!  ${dbName}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default dbConnect;