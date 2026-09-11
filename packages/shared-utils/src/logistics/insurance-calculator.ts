export interface InsuranceData {
  coverageAmount?: { amount: number };
  isActive: boolean;
  startDate: Date;
  endDate: Date;
}

export const calculateInsuranceCost = (value: number, coveragePercentage: number): number => {
  const premiumRate = 0.02;
  const coverage = (value * coveragePercentage) / 100;
  return coverage * premiumRate;
};

export const calculateCoverageAmount = (insurance: InsuranceData): number => {
  return insurance.coverageAmount?.amount || 0;
};

export const isInsuranceValid = (insurance: InsuranceData): boolean => {
  const now = new Date();
  return insurance.isActive && now >= insurance.startDate && now <= insurance.endDate;
};
