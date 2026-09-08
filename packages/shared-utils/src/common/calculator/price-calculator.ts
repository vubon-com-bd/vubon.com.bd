export const calculateSubtotal = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateTotal = (subtotal: number, discount: number, tax: number): number => {
  return subtotal - discount + tax;
};
