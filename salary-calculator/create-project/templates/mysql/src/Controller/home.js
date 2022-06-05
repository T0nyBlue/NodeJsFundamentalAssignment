const express = require("express");
const router = express.Router();
const {
  healthInsurance,
  socialInsurance,
  unemploymentInsurance,
  personalIncomeTax,
} = require("../../services/calc-salary");

var conn = {
  host: "0.0.0.0",
  port: "32769",
  user: "root",
  password: "root",
  database: "tax",
};

knex = require("knex")({ client: "mysql", connection: conn });

const personalDeduction = 11000000;
const dependentPersonalDeduction = 4400000;

router.get("/", async (req, res) => {
  res.render("home", {
    grossSalary: 0,
    dependentPerson: 0,
    area: 1,
    insurance: 0,
    personalIncomeTax: 0,
    netSalary: 0,
  });
});

router.post("/", async (req, res, next) => {
  var grossSalary = req.body.grossSalary;
  var dependentPerson = req.body.dependentPerson;
  var area = "A" + req.body.area;

  const insuranceList = await knex("Insurance").select({
    Name: "Name",
    A1: "A1",
    A2: "A2",
    A3: "A3",
    A4: "A4",
    Percent: "Percent",
  });

  const taxList = await knex("Tax").select({
    Tax: "Tax",
    MinSalary: "MinSalary",
    MaxSalary: "MaxSalary",
  });

  //calculate insurance

  const results = await Promise.all([
    healthInsurance(grossSalary, area, insuranceList),
    socialInsurance(grossSalary, area, insuranceList),
    unemploymentInsurance(grossSalary, area, insuranceList),
  ]);

  const insurance = results[0] + results[1] + results[2];

  const beforeTax = grossSalary - insurance;

  let incomeTax =
    beforeTax -
    personalDeduction -
    dependentPersonalDeduction * dependentPerson;

  if (incomeTax < 0) {
    incomeTax = 0;
  }

  //calculate personalIncomeTax

  const personalIncomeTaxResult = await personalIncomeTax(incomeTax, taxList);
  const netSalary = beforeTax - personalIncomeTaxResult;

  res.render("home", {
    grossSalary: grossSalary,
    dependentPerson: dependentPerson,
    area: req.body.area,
    insurance: insurance,
    personalIncomeTax: personalIncomeTaxResult,
    netSalary: netSalary,
  });
});

module.exports = router;
