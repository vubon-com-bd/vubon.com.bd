export interface VendorCalculationData {
  totalProducts?: number;
  totalRevenue?: number;
  totalOrders?: number;
}

export const calculateVendorTotalProducts = (vendor: VendorCalculationData): number => {
  return vendor.totalProducts || 0;
};

export const calculateVendorTotalRevenue = (vendor: VendorCalculationData): number => {
  return vendor.totalRevenue || 0;
};

export const calculateVendorTotalOrders = (vendor: VendorCalculationData): number => {
  return vendor.totalOrders || 0;
};
