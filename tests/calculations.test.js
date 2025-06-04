const { calculateTaxes, taxRate } = require('../src/calculations');

test('calculateTaxes returns correct totals for sample data', () => {
  const result = calculateTaxes({
    grossIncome: 112994.95,
    retirementContributions: 9018.12,
    healthcareInsurance: 6537.14,
    hsaContribution: 4423,
    otherDeductions: 169
  });
  expect(result.wisconsinTax).toBeCloseTo(4423.58757, 5);
  expect(result.federalTax).toBeCloseTo(10828.3918, 5);
  expect(result.socialSecurityTax).toBeCloseTo(5756.55678, 5);
  expect(result.medicareTax).toBeCloseTo(1346.291505, 5);
  expect(result.totalTaxes).toBeCloseTo(22354.827655, 5);
});

test('taxRate returns expected string for 100000', () => {
  const expected = 'Tax = 8056\nEffective Tax Rate for 100000 = 8.056\nEffective tax for 70800 = 11.378531073446327\nTake home = 91944';
  expect(taxRate(100000)).toBe(expected);
});
