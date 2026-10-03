/**
 * Calculate Equated Monthly Installment (EMI)
 * @module shared-utils/calculator/finance
 */
export interface EmiInput {
  readonly principal: number;
  readonly annualRatePercent: number;
  readonly months: number;
}

export interface EmiResult {
  readonly emi: number;
  readonly totalPayment: number;
  readonly totalInterest: number;
}

export function calculateEmi(input: EmiInput): EmiResult {
  const { principal, annualRatePercent, months } = input;
  if (principal <= 0 || months < 1) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }
  if (annualRatePercent <= 0) {
    const emi = principal / months;
    return {
      emi: round2(emi),
      totalPayment: round2(principal),
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRatePercent / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * months;

  return {
    emi: round2(emi),
    totalPayment: round2(totalPayment),
    totalInterest: round2(totalPayment - principal),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
