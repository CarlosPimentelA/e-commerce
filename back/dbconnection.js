import mongoose from "mongoose";


const connectionDb = () => {
  try {
    mongoose.connect(``);
    console.log("Connection succesful");
  } catch (error) {
    console.log("Conection error: ", error.message);
  }
};

export default connectionDb;
