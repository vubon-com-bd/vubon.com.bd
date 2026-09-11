export interface TaxData {
  rate: number;
}

export interface CartTaxData {
  subtotal?: { amount: number };
}

export const calculateCartTaxAmount = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const calculateCartTotalWithTax = (amount: number, taxRate: number): number => {
  return amount + calculateCartTaxAmount(amount, taxRate);
};

export const calculateCartTax = (cart: CartTaxData, tax: TaxData): number => {
  const subtotal = cart.subtotal?.amount || 0;
  return calculateCartTaxAmount(subtotal, tax.rate);
};

export const calculateItemTax = (price: number, taxRate: number): number => {
  return calculateCartTaxAmount(price, taxRate);
};
