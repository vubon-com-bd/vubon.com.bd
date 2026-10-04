export const VENDOR_TYPE = {
  INDIVIDUAL: 'individual',
  SOLE_PROPRIETOR: 'sole_proprietor',
  PARTNERSHIP: 'partnership',
  LIMITED_COMPANY: 'limited_company',
  CORPORATION: 'corporation',
  COOPERATIVE: 'cooperative',
  GOVERNMENT: 'government',
} as const;

export const VENDOR_BUSINESS_TYPE = {
  MANUFACTURER: 'manufacturer',
  WHOLESALER: 'wholesaler',
  RETAILER: 'retailer',
  DISTRIBUTOR: 'distributor',
  RESELLER: 'reseller',
  SERVICE_PROVIDER: 'service_provider',
  DROPSHIPPER: 'dropshipper',
} as const;

export type VendorTypeType = (typeof VENDOR_TYPE)[keyof typeof VENDOR_TYPE];
export type VendorBusinessTypeType =
  (typeof VENDOR_BUSINESS_TYPE)[keyof typeof VENDOR_BUSINESS_TYPE];
