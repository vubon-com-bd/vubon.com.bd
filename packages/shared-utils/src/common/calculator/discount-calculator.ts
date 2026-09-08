export const calculateDiscount = (price: number, discountPercentage: number): number => {
  return (price * discountPercentage) / 100;
};

export const calculateDiscountPrice = (price: number, discountPercentage: number): number => {
  return price - calculateDiscount(price, discountPercentage);
};
