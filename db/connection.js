const mongoose  = require("mongoose");
exports.connectToDatabase = async() =>{
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

exports.disconnectFromDatabase = async() => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}