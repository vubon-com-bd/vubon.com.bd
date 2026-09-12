export interface CheckoutCalculationData {
  subtotal?: { amount: number };
  discountTotal?: { amount: number };
  taxTotal?: { amount: number };
  shippingCost?: { amount: number };
}

export const calculateCheckoutTotal = (checkout: CheckoutCalculationData): number => {
  const subtotal = checkout.subtotal?.amount || 0;
  const discount = checkout.discountTotal?.amount || 0;
  const tax = checkout.taxTotal?.amount || 0;
  const shipping = checkout.shippingCost?.amount || 0;
  return subtotal - discount + tax + shipping;
};

export const calculateOrderTotal = (order: CheckoutCalculationData): number => {
  const subtotal = order.subtotal?.amount || 0;
  const discount = order.discountTotal?.amount || 0;
  const tax = order.taxTotal?.amount || 0;
  const shipping = order.shippingCost?.amount || 0;
  return subtotal - discount + tax + shipping;
};

export const calculateCheckoutStepProgress = (currentStep: number, totalSteps: number): number => {
  if (totalSteps === 0) return 0;
  return (currentStep / totalSteps) * 100;
};
