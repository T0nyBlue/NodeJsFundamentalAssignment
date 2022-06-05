const Insurance = require("../../src/Model/insurance-mongodb");
const Tax = require("../../src/Model/tax-mongodb");
const db = require("./db");
const {
  healthInsurance,
  socialInsurance,
  unemploymentInsurance,
  personalIncomeTax,
} = require("../calc-salary");

const generateMockData = async () => {
  await Insurance.insertMany([
    {
      Name: "HealthInsurance",
      A1: 447000,
      A2: 447000,
      A3: 447000,
      A4: 447000,
      Percent: 0.015,
    },
    {
      Name: "SocialInsurance",
      A1: 2384000,
      A2: 2384000,
      A3: 2384000,
      A4: 2384000,
      Percent: 0.08,
    },
    {
      Name: "UnemploymentInsurance",
      A1: 884000,
      A2: 784000,
      A3: 686000,
      A4: 614000,
      Percent: 0.01,
    },
  ]);

  await Tax.insertMany([
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
  ]);
};

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  jest.setTimeout(10000);
  await db.closeDatabase();
});

describe("Calculate Salary Service", () => {
  it("calculate Health Insurance", async () => {
    await generateMockData();
    const insuranceList = await Insurance.find();
    const testHealthInsurance = await healthInsurance(
      10000000,
      "A1",
      insuranceList
    );
    expect(testHealthInsurance).toEqual(150000);
  });

  it("calculate Social Insurance", async () => {
    await generateMockData();
    const insuranceList = await Insurance.find();
    const testSocialnsurance = await socialInsurance(
      10000000,
      "A1",
      insuranceList
    );
    expect(testSocialnsurance).toEqual(800000);
  });

  it("calculate Unemployment Insurance", async () => {
    await generateMockData();
    const insuranceList = await Insurance.find();
    const testUnemploymentlnsurance = await unemploymentInsurance(
      10000000,
      "A1",
      insuranceList
    );
    expect(testUnemploymentlnsurance).toEqual(100000);
  });

  it("calculate Personal Income Tax", async () => {
    await generateMockData();
    const taxList = await Tax.find();
    const testUnemploymentlnsurance = await personalIncomeTax(
      10000000,
      taxList
    );
    expect(testUnemploymentlnsurance).toEqual(1500000);
  });
});
