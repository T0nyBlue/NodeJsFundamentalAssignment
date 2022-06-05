const express = require("express");
const router = express.Router();
const Tax = require("../Model/tax-mongodb");
const Insurance = require("../Model/insurance-mongodb");
const {
  healthInsurance,
  socialInsurance,
  unemploymentInsurance,
  personalIncomeTax,
} = require("../../services/calc-salary");

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

  const insuranceList = await Insurance.find();
  const taxList = await Tax.find();

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

  console.log(personalIncomeTaxResult);

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
