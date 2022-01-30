const mongoose = require('mongoose');

async function connect() {
  try {
    // await mongoose.connect(process.env.DB_URI);
    await mongoose.connect("mongodb+srv://kieuvu_vshop:kieuminhvu1@cluster0.wpjf5.mongodb.net/test?authSource=admin&replicaSet=atlas-1011fy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
    console.log(`Connect to database successfully!!!`);
  } catch (error) {
    console.log(`Connect to database failure!!!`);
  }
}

module.exports = { connect };