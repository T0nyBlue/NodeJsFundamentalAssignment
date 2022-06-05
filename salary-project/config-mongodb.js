const mongoose = require("mongoose");
require("dotenv").config();

const server = process.env.SERVER;
const database = process.env.DATABASE;
const taxData = require("./master-data/tax-data");
const insuranceData = require("./master-data/insurance-data");
const Tax = require("./src/Model/tax-mongodb");
const Insurance = require("./src/Model/insurance-mongodb");

exports.mongodbConection = () => {
  mongoose
    .connect(`mongodb://localhost:${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected!!");
    })
    .then(async () => {
      // var db =
      // var collectionExists = db.ListCollectionNames().ToList().Contains("cap2");
      taxData.map(async (item) => {
        try {
          const tax = new Tax({
            MinSalary: item.MinSalary,
            MaxSalary: item.MaxSalary,
            Tax: item.Tax,
          });
          const savedTax = await tax.save();
          console.log("successfully saved");
        } catch (err) {
          console.log("error!");
        }
      });
    })
    .then(async () => {
      insuranceData.map(async (item) => {
        try {
          const insurance = new Insurance({
            Name: item.Name,
            A1: item.A1,
            A2: item.A2,
            A3: item.A1,
            A4: item.A2,
            Percent: item.Percent,
          });
          const savedInsurance = await insurance.save();
          console.log("successfully saved");
        } catch (err) {
          console.log("error!");
        }
      });
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB", err);
    });
};
