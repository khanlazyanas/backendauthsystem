import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "backendauth"  // ✅ Yahan Database Name Specify Kiya Hai
        });

        console.log(` MongoDB Connected: ${conn.connection.host}`);
        // console.log(` Using Database: ${conn.connection.name}`);  // ✅ Database Ka Naam Print Karega
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
