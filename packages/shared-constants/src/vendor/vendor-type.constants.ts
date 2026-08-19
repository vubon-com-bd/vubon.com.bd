/**
 * ভেন্ডার টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ভেন্ডার টাইপ অবজেক্ট
 */
export const VendorType = {
  INDIVIDUAL: 'INDIVIDUAL',
  BUSINESS: 'BUSINESS',
  CORPORATE: 'CORPORATE',
  SUPPLIER: 'SUPPLIER',
  DISTRIBUTOR: 'DISTRIBUTOR',
  RETAILER: 'RETAILER',
  WHOLESALER: 'WHOLESALER',
  MANUFACTURER: 'MANUFACTURER',
} as const;

/**
 * ভেন্ডার টাইপ - ইউনিয়ন টাইপ
 */
export type VendorTypeValue = (typeof VendorType)[keyof typeof VendorType];

/**
 * ভেন্ডার টাইপ লেবেলসমূহ
 */
export const VendorTypeLabels: Record<VendorTypeValue, string> = {
  [VendorType.INDIVIDUAL]: 'Individual',
  [VendorType.BUSINESS]: 'Business',
  [VendorType.CORPORATE]: 'Corporate',
  [VendorType.SUPPLIER]: 'Supplier',
  [VendorType.DISTRIBUTOR]: 'Distributor',
  [VendorType.RETAILER]: 'Retailer',
  [VendorType.WHOLESALER]: 'Wholesaler',
  [VendorType.MANUFACTURER]: 'Manufacturer',
};

/**
 * ভেন্ডার টাইপ বিবরণসমূহ
 */
export const VendorTypeDescriptions: Record<VendorTypeValue, string> = {
  [VendorType.INDIVIDUAL]: 'Individual vendor or sole proprietor',
  [VendorType.BUSINESS]: 'Registered business entity',
  [VendorType.CORPORATE]: 'Corporate organization',
  [VendorType.SUPPLIER]: 'Supplies products or services',
  [VendorType.DISTRIBUTOR]: 'Distributes products to retailers',
  [VendorType.RETAILER]: 'Sells directly to consumers',
  [VendorType.WHOLESALER]: 'Sells in bulk to retailers',
  [VendorType.MANUFACTURER]: 'Manufactures products',
};

/**
 * ভেন্ডার টাইপ অনুযায়ী প্রয়োজনীয় ডকুমেন্টসমূহ
 */
export const VendorTypeRequirements: Record<VendorTypeValue, string[]> = {
  [VendorType.INDIVIDUAL]: ['national-id', 'passport-photo'],
  [VendorType.BUSINESS]: ['business-license', 'tin-certificate', 'trade-license'],
  [VendorType.CORPORATE]: ['incorporation-certificate', 'tax-id', 'memorandum-of-association'],
  [VendorType.SUPPLIER]: ['supplier-license', 'quality-certificate'],
  [VendorType.DISTRIBUTOR]: ['distribution-agreement', 'warehouse-license'],
  [VendorType.RETAILER]: ['retail-license', 'vat-registration'],
  [VendorType.WHOLESALER]: ['wholesale-license', 'inventory-details'],
  [VendorType.MANUFACTURER]: [
    'manufacturing-license',
    'quality-certificate',
    'factory-registration',
  ],
};
