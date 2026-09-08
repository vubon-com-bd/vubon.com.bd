export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('bn-BD').format(num);
};

export const formatNumberWithDecimal = (num: number, decimal: number = 2): string => {
  return num.toFixed(decimal);
};
