import mongoose from "mongoose";


const connectionDb = () => {
  try {
    mongoose.connect(`mongodb+srv://almontejose:jt99UOxiuG7JJvsM@cluster0.icbz5l7.mongodb.net/Ecommerce`);
    console.log("Connection succesful");
  } catch (error) {
    console.log("Conection error: ", error.message);
  }
};

export default connectionDb;
