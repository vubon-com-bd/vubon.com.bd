/**
 * Vendor Type Constants
 * Types of vendors
 */

// Type Types
export const VENDOR_TYPE_TYPES = {
  INDIVIDUAL: 'individual',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
  PREMIUM: 'premium',
  PARTNER: 'partner',
} as const;

export type VendorTypeType = (typeof VENDOR_TYPE_TYPES)[keyof typeof VENDOR_TYPE_TYPES];

// Type Categories
export const VENDOR_TYPE_CATEGORIES = {
  PERSONAL: 'personal',
  BUSINESS: 'business',
  CORPORATE: 'corporate',
} as const;

export type VendorTypeCategory =
  (typeof VENDOR_TYPE_CATEGORIES)[keyof typeof VENDOR_TYPE_CATEGORIES];

// Type Colors (for UI)
export const VENDOR_TYPE_COLORS = {
  INDIVIDUAL: '#blue-400',
  BUSINESS: '#blue-500',
  ENTERPRISE: '#purple-500',
  PREMIUM: '#gold-500',
  PARTNER: '#green-500',
} as const;

export type VendorTypeColor = (typeof VENDOR_TYPE_COLORS)[keyof typeof VENDOR_TYPE_COLORS];

// Type Icons (for UI)
export const VENDOR_TYPE_ICONS = {
  INDIVIDUAL: '👤',
  BUSINESS: '🏢',
  ENTERPRISE: '🏛️',
  PREMIUM: '⭐',
  PARTNER: '🤝',
} as const;

export type VendorTypeIcon = (typeof VENDOR_TYPE_ICONS)[keyof typeof VENDOR_TYPE_ICONS];

// Type Requirements
export const VENDOR_TYPE_REQUIREMENTS = {
  INDIVIDUAL: ['NID', 'Phone', 'Email'],
  BUSINESS: ['Trade License', 'TIN', 'VAT'],
  ENTERPRISE: ['Trade License', 'TIN', 'VAT', 'Bank Account'],
  PREMIUM: ['Trade License', 'TIN', 'VAT', 'Bank Account', 'Tax Certificate'],
  PARTNER: ['Trade License', 'TIN', 'VAT', 'Bank Account', 'Tax Certificate', 'Audit Report'],
};

// Type Benefits
export const VENDOR_TYPE_BENEFITS = {
  INDIVIDUAL: ['Basic Commission: 10-20%'],
  BUSINESS: ['Commission: 15-25%', 'Priority Support'],
  ENTERPRISE: ['Commission: 10-20%', 'Dedicated Account Manager'],
  PREMIUM: ['Commission: 5-15%', 'Dedicated Account Manager', 'Premium Features'],
  PARTNER: [
    'Commission: 3-10%',
    'Dedicated Account Manager',
    'Premium Features',
    'Revenue Sharing',
  ],
};

// Utility Functions
export function vendorTypeGetLabel(type: VendorTypeType): string {
  const labels: Record<VendorTypeType, string> = {
    [VENDOR_TYPE_TYPES.INDIVIDUAL]: 'Individual',
    [VENDOR_TYPE_TYPES.BUSINESS]: 'Business',
    [VENDOR_TYPE_TYPES.ENTERPRISE]: 'Enterprise',
    [VENDOR_TYPE_TYPES.PREMIUM]: 'Premium',
    [VENDOR_TYPE_TYPES.PARTNER]: 'Partner',
  };
  return labels[type] || 'Unknown';
}

export function vendorTypeGetCategory(type: VendorTypeType): VendorTypeCategory {
  const categories: Record<VendorTypeType, VendorTypeCategory> = {
    [VENDOR_TYPE_TYPES.INDIVIDUAL]: VENDOR_TYPE_CATEGORIES.PERSONAL,
    [VENDOR_TYPE_TYPES.BUSINESS]: VENDOR_TYPE_CATEGORIES.BUSINESS,
    [VENDOR_TYPE_TYPES.ENTERPRISE]: VENDOR_TYPE_CATEGORIES.CORPORATE,
    [VENDOR_TYPE_TYPES.PREMIUM]: VENDOR_TYPE_CATEGORIES.BUSINESS,
    [VENDOR_TYPE_TYPES.PARTNER]: VENDOR_TYPE_CATEGORIES.CORPORATE,
  };
  return categories[type] || VENDOR_TYPE_CATEGORIES.BUSINESS;
}

export function vendorTypeGetColor(type: VendorTypeType): VendorTypeColor {
  const colors: Record<VendorTypeType, VendorTypeColor> = {
    [VENDOR_TYPE_TYPES.INDIVIDUAL]: VENDOR_TYPE_COLORS.INDIVIDUAL,
    [VENDOR_TYPE_TYPES.BUSINESS]: VENDOR_TYPE_COLORS.BUSINESS,
    [VENDOR_TYPE_TYPES.ENTERPRISE]: VENDOR_TYPE_COLORS.ENTERPRISE,
    [VENDOR_TYPE_TYPES.PREMIUM]: VENDOR_TYPE_COLORS.PREMIUM,
    [VENDOR_TYPE_TYPES.PARTNER]: VENDOR_TYPE_COLORS.PARTNER,
  };
  return colors[type] || '#gray-400';
}

export function vendorTypeGetIcon(type: VendorTypeType): VendorTypeIcon {
  const icons: Record<VendorTypeType, VendorTypeIcon> = {
    [VENDOR_TYPE_TYPES.INDIVIDUAL]: VENDOR_TYPE_ICONS.INDIVIDUAL,
    [VENDOR_TYPE_TYPES.BUSINESS]: VENDOR_TYPE_ICONS.BUSINESS,
    [VENDOR_TYPE_TYPES.ENTERPRISE]: VENDOR_TYPE_ICONS.ENTERPRISE,
    [VENDOR_TYPE_TYPES.PREMIUM]: VENDOR_TYPE_ICONS.PREMIUM,
    [VENDOR_TYPE_TYPES.PARTNER]: VENDOR_TYPE_ICONS.PARTNER,
  };
  return icons[type] || '👤';
}

export function vendorTypeGetRequirements(type: VendorTypeType): string[] {
  const requirements: Record<VendorTypeType, string[]> = {
    [VENDOR_TYPE_TYPES.INDIVIDUAL]: VENDOR_TYPE_REQUIREMENTS.INDIVIDUAL,
    [VENDOR_TYPE_TYPES.BUSINESS]: VENDOR_TYPE_REQUIREMENTS.BUSINESS,
    [VENDOR_TYPE_TYPES.ENTERPRISE]: VENDOR_TYPE_REQUIREMENTS.ENTERPRISE,
    [VENDOR_TYPE_TYPES.PREMIUM]: VENDOR_TYPE_REQUIREMENTS.PREMIUM,
    [VENDOR_TYPE_TYPES.PARTNER]: VENDOR_TYPE_REQUIREMENTS.PARTNER,
  };
  return requirements[type] || [];
}
