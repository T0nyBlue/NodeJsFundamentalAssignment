async function healthInsurance(grossSalary, area, insuranceList) {
  const healthInsuranceData = insuranceList.find(
    (x) => x.Name === "HealthInsurance"
  );

  const healthInsuranceMax = healthInsuranceData[`${area}`];
  const healthInsurancePercent = healthInsuranceData.Percent;

  let healthInsurance = grossSalary * healthInsurancePercent;
  if (healthInsurance > healthInsuranceMax) {
    healthInsurance = healthInsuranceMax;
  }

  return healthInsurance;
}

async function socialInsurance(grossSalary, area, insuranceList) {
  const socialInsuranceData = insuranceList.find(
    (x) => x.Name === "SocialInsurance"
  );
  const socialInsuranceMax = socialInsuranceData[`${area}`];
  const socialInsurancePercent = socialInsuranceData.Percent;

  let socialInsurance = grossSalary * socialInsurancePercent;
  if (socialInsurance > socialInsuranceMax) {
    socialInsurance = socialInsuranceMax;
  }

  return socialInsurance;
}

async function unemploymentInsurance(grossSalary, area, insuranceList) {
  const unemploymentInsuranceData = insuranceList.find(
    (x) => x.Name === "UnemploymentInsurance"
  );
  const unemploymentInsuranceMax = unemploymentInsuranceData[`${area}`];
  const unemploymentInsurancePercent = unemploymentInsuranceData.Percent;

  let unemploymentInsurance = grossSalary * unemploymentInsurancePercent;
  if (unemploymentInsurance > unemploymentInsuranceMax) {
    unemploymentInsurance = unemploymentInsuranceMax;
  }

  return unemploymentInsurance;
}

async function personalIncomeTax(incomeTax, taxList) {
  const minSalary = Math.max(...taxList.map((x) => x.MaxSalary));

  let incometaxPercent = 0;
  let personalIncomeTax = 0;
  if (incomeTax >= minSalary) {
    incometaxPercent = taxList.find((x) => x.MinSalary == minSalary).Tax;
  } else {
    incometaxPercent = taxList.find(
      (x) => x.MinSalary <= incomeTax && incomeTax < x.MaxSalary
    ).Tax;
  }

  console.log(incometaxPercent);

  return (personalIncomeTax = incomeTax * incometaxPercent);
}

module.exports = {
  healthInsurance,
  socialInsurance,
  unemploymentInsurance,
  personalIncomeTax,
};
