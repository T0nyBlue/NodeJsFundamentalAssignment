const taxData = [
  {
    MinSalary: 0,
    MaxSalary: 5000000,
    Tax: 0.05,
  },
  {
    MinSalary: 5,
    MaxSalary: 10000000,
    Tax: 0.1,
  },
  {
    MinSalary: 10000000,
    MaxSalary: 18000000,
    Tax: 0.15,
  },
  {
    MinSalary: 18000000,
    MaxSalary: 32000000,
    Tax: 0.2,
  },
  {
    MinSalary: 32000000,
    MaxSalary: 52000000,
    Tax: 0.25,
  },
  {
    MinSalary: 52000000,
    MaxSalary: 80000000,
    Tax: 0.3,
  },
  {
    MinSalary: 80000000,
    MaxSalary: -1,
    Tax: 0.35,
  },
];

module.exports = taxData;
