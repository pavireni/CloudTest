function calculateTaxes({
  grossIncome,
  retirementContributions,
  healthcareInsurance,
  hsaContribution,
  otherDeductions
}) {
  const agi = grossIncome - retirementContributions - healthcareInsurance - hsaContribution - otherDeductions;
  const taxableIncome = agi - 22630;

  let wisconsinTax = 0;
  if (agi <= 36840) {
    wisconsinTax = 644.70 + (agi - 18420) * 0.0350;
  } else if (agi <= 405550) {
    wisconsinTax = 1455.18 + (agi - 36840) * 0.053;
  }

  let federalTax = 0;
  if (taxableIncome <= 11000) {
    federalTax = taxableIncome * 0.1;
  } else if (taxableIncome <= 44725) {
    federalTax = 1100 + (taxableIncome - 11000) * 0.12;
  } else if (taxableIncome <= 89450) {
    federalTax = 5220 + (taxableIncome - 44725) * 0.22;
  } else if (taxableIncome <= 190750) {
    federalTax = 14454 + (taxableIncome - 89450) * 0.24;
  } else if (taxableIncome <= 364200) {
    federalTax = 36086 + (taxableIncome - 190750) * 0.32;
  } else if (taxableIncome <= 462500) {
    federalTax = 100918 + (taxableIncome - 364200) * 0.35;
  } else {
    federalTax = 138548 + (taxableIncome - 462500) * 0.37;
  }

  const socialSecurityTax = 0.062 * agi;
  const medicareTax = 0.0145 * agi;

  const totalTaxes = wisconsinTax + federalTax + socialSecurityTax + medicareTax;

  return {
    wisconsinTax,
    federalTax,
    socialSecurityTax,
    medicareTax,
    totalTaxes,
  };
}

const STANDARD_DEDUCTIBLE_2022 = 25900;
const BRACKETS_2023 = [{"income_range": [0, 22000], "tax_rate": 0.1}, {"income_range": [22001, 89050], "tax_rate": 0.12}, {"income_range": [89051, 181500], "tax_rate": 0.22}, {"income_range": [181501, 364150], "tax_rate": 0.24}, {"income_range": [364151, 523600], "tax_rate": 0.32}, {"income_range": [523601, 693750], "tax_rate": 0.35}, {"income_range": [693751,700000], "tax_rate": 0.37}];
const STANDARD_DEDUCTIBLE_2023 = 29200;
let BRACKETS_2022 = [
  {"income_range": [0, 23200], "tax_rate": 0.1},
  {"income_range": [23201, 94300], "tax_rate": 0.12},
  {"income_range": [94301, 201100], "tax_rate": 0.22},
  {"income_range": [201101, 383850], "tax_rate": 0.24},
  {"income_range": [383851, 536900], "tax_rate": 0.32},
  {"income_range": [536901, 609350], "tax_rate": 0.35},
  {"income_range": [609351, 700000], "tax_rate": 0.37}
];
let [BRACKETS, STANDARD_DEDUCTIBLE] = [BRACKETS_2022, STANDARD_DEDUCTIBLE_2022];

function taxRate(amount) {
  let remAmount = amount;
  remAmount = remAmount - STANDARD_DEDUCTIBLE_2023; //Deductible
  const origRemAmount = remAmount;

  let rates = BRACKETS_2023.map(v => ({val: v.income_range[1] - v.income_range[0], percentage: v.tax_rate}));

  let tax = 0;
  for (const rateKey of rates) {
    if (remAmount > rateKey.val) {
      tax += rateKey.val * rateKey.percentage;
      remAmount -= rateKey.val;
    } else {
      tax += remAmount * rateKey.percentage;
      break;
    }
  }
  return `Tax = ${tax}\nEffective Tax Rate for ${amount} = ${tax*100/amount}\nEffective tax for ${origRemAmount} = ${tax*100/origRemAmount}\nTake home = ${amount-tax}`;
}

module.exports = { calculateTaxes, taxRate };
