/**
 * Courier Constants
 * Configuration for courier services - Bangladesh based
 */

export const LOGISTICS_COURIER = {
  // Courier Types
  TYPES: {
    LOCAL: 'local',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
    EXPRESS: 'express',
    STANDARD: 'standard',
    ECONOMY: 'economy',
  } as const,

  // Courier Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    MAINTENANCE: 'maintenance',
    OFFLINE: 'offline',
  } as const,

  // Courier Providers (Bangladesh)
  PROVIDERS: {
    SA_PARIBOHON: 'sa_paribohon',
    PAPERFLY: 'paperfly',
    REDX: 'redx',
    PATHO: 'patho',
    SUNDARBAN: 'sundarban',
    KARATOYA: 'karatoya',
    JANATA: 'janata',
    DESH: 'desh',
    CONTINENTAL: 'continental',
    DHL: 'dhl',
    FEDEX: 'fedex',
    OTHER: 'other',
  } as const,

  // Provider Labels
  PROVIDER_LABELS: {
    SA_PARIBOHON: 'SA Paribohon',
    PAPERFLY: 'Paperfly',
    REDX: 'RedX',
    PATHO: 'Pathao Courier',
    SUNDARBAN: 'Sundarban Courier',
    KARATOYA: 'Karatoya Courier',
    JANATA: 'Janata Courier',
    DESH: 'Desh Courier',
    CONTINENTAL: 'Continental Courier',
    DHL: 'DHL Bangladesh',
    FEDEX: 'FedEx Bangladesh',
    OTHER: 'Other Courier',
  } as const,

  // Service Types
  SERVICE_TYPES: {
    DOOR_TO_DOOR: 'door_to_door',
    DOOR_TO_OFFICE: 'door_to_office',
    OFFICE_TO_DOOR: 'office_to_door',
    OFFICE_TO_OFFICE: 'office_to_office',
    PICKUP_POINT: 'pickup_point',
  } as const,

  // Service Type Labels
  SERVICE_LABELS: {
    DOOR_TO_DOOR: 'Door to Door',
    DOOR_TO_OFFICE: 'Door to Office',
    OFFICE_TO_DOOR: 'Office to Door',
    OFFICE_TO_OFFICE: 'Office to Office',
    PICKUP_POINT: 'Pickup Point',
  } as const,

  // Payment Methods
  PAYMENT_METHODS: {
    PREPAID: 'prepaid',
    POSTPAID: 'postpaid',
    COD: 'cod',
    MONTHLY: 'monthly',
  } as const,

  // Payment Method Labels
  PAYMENT_LABELS: {
    PREPAID: 'Prepaid',
    POSTPAID: 'Postpaid',
    COD: 'Cash on Delivery',
    MONTHLY: 'Monthly Billing',
  } as const,

  // Courier Limits
  LIMITS: {
    MAX_WEIGHT_KG: 50,
    MAX_LENGTH_CM: 100,
    MAX_WIDTH_CM: 100,
    MAX_HEIGHT_CM: 100,
    MAX_VOLUME_CM3: 1000000,
    MAX_PACKAGES_PER_REQUEST: 10,
  } as const,

  // Delivery Time Estimates (in days)
  DELIVERY_TIME: {
    LOCAL: 1,
    NATIONAL: 3,
    INTERNATIONAL: 7,
    EXPRESS: 1,
    STANDARD: 3,
    ECONOMY: 5,
  } as const,

  // Contact Information
  CONTACTS: {
    SA_PARIBOHON: '+880-XXXXXXXXXX',
    PAPERFLY: '+880-XXXXXXXXXX',
    REDX: '+880-XXXXXXXXXX',
    PATHO: '+880-XXXXXXXXXX',
    SUNDARBAN: '+880-XXXXXXXXXX',
    KARATOYA: '+880-XXXXXXXXXX',
    JANATA: '+880-XXXXXXXXXX',
    DESH: '+880-XXXXXXXXXX',
    CONTINENTAL: '+880-XXXXXXXXXX',
    DHL: '+880-XXXXXXXXXX',
    FEDEX: '+880-XXXXXXXXXX',
    OTHER: 'N/A',
  } as const,

  // Websites
  WEBSITES: {
    SA_PARIBOHON: 'https://www.saparibohon.com',
    PAPERFLY: 'https://www.paperfly.com',
    REDX: 'https://www.redx.com.bd',
    PATHO: 'https://www.pathao.com',
    SUNDARBAN: 'https://www.sundarbancourier.com',
    KARATOYA: 'https://www.karatoya.com',
    JANATA: 'https://www.janatacourier.com',
    DESH: 'https://www.deshcourier.com',
    CONTINENTAL: 'https://www.continentalcourier.com',
    DHL: 'https://www.dhl.com.bd',
    FEDEX: 'https://www.fedex.com',
    OTHER: 'N/A',
  } as const,
} as const;

// Courier Types
export type LogisticsCourierType =
  (typeof LOGISTICS_COURIER.TYPES)[keyof typeof LOGISTICS_COURIER.TYPES];

// Courier Statuses
export type LogisticsCourierStatus =
  (typeof LOGISTICS_COURIER.STATUS)[keyof typeof LOGISTICS_COURIER.STATUS];

// Courier Providers
export type LogisticsCourierProvider =
  (typeof LOGISTICS_COURIER.PROVIDERS)[keyof typeof LOGISTICS_COURIER.PROVIDERS];

// Service Types
export type LogisticsCourierServiceType =
  (typeof LOGISTICS_COURIER.SERVICE_TYPES)[keyof typeof LOGISTICS_COURIER.SERVICE_TYPES];

// Payment Methods
export type LogisticsCourierPaymentMethod =
  (typeof LOGISTICS_COURIER.PAYMENT_METHODS)[keyof typeof LOGISTICS_COURIER.PAYMENT_METHODS];

// Utility Functions
export function logisticsCourierGetTypeLabel(type: LogisticsCourierType): string {
  const labels: Record<LogisticsCourierType, string> = {
    [LOGISTICS_COURIER.TYPES.LOCAL]: 'Local',
    [LOGISTICS_COURIER.TYPES.NATIONAL]: 'National',
    [LOGISTICS_COURIER.TYPES.INTERNATIONAL]: 'International',
    [LOGISTICS_COURIER.TYPES.EXPRESS]: 'Express',
    [LOGISTICS_COURIER.TYPES.STANDARD]: 'Standard',
    [LOGISTICS_COURIER.TYPES.ECONOMY]: 'Economy',
  };
  return labels[type] || 'Unknown';
}

export function logisticsCourierGetStatusLabel(status: LogisticsCourierStatus): string {
  const labels: Record<LogisticsCourierStatus, string> = {
    [LOGISTICS_COURIER.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_COURIER.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_COURIER.STATUS.SUSPENDED]: 'Suspended',
    [LOGISTICS_COURIER.STATUS.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_COURIER.STATUS.OFFLINE]: 'Offline',
  };
  return labels[status] || 'Unknown';
}

export function logisticsCourierGetProviderLabel(provider: LogisticsCourierProvider): string {
  const labels: Record<LogisticsCourierProvider, string> = {
    [LOGISTICS_COURIER.PROVIDERS.SA_PARIBOHON]: LOGISTICS_COURIER.PROVIDER_LABELS.SA_PARIBOHON,
    [LOGISTICS_COURIER.PROVIDERS.PAPERFLY]: LOGISTICS_COURIER.PROVIDER_LABELS.PAPERFLY,
    [LOGISTICS_COURIER.PROVIDERS.REDX]: LOGISTICS_COURIER.PROVIDER_LABELS.REDX,
    [LOGISTICS_COURIER.PROVIDERS.PATHO]: LOGISTICS_COURIER.PROVIDER_LABELS.PATHO,
    [LOGISTICS_COURIER.PROVIDERS.SUNDARBAN]: LOGISTICS_COURIER.PROVIDER_LABELS.SUNDARBAN,
    [LOGISTICS_COURIER.PROVIDERS.KARATOYA]: LOGISTICS_COURIER.PROVIDER_LABELS.KARATOYA,
    [LOGISTICS_COURIER.PROVIDERS.JANATA]: LOGISTICS_COURIER.PROVIDER_LABELS.JANATA,
    [LOGISTICS_COURIER.PROVIDERS.DESH]: LOGISTICS_COURIER.PROVIDER_LABELS.DESH,
    [LOGISTICS_COURIER.PROVIDERS.CONTINENTAL]: LOGISTICS_COURIER.PROVIDER_LABELS.CONTINENTAL,
    [LOGISTICS_COURIER.PROVIDERS.DHL]: LOGISTICS_COURIER.PROVIDER_LABELS.DHL,
    [LOGISTICS_COURIER.PROVIDERS.FEDEX]: LOGISTICS_COURIER.PROVIDER_LABELS.FEDEX,
    [LOGISTICS_COURIER.PROVIDERS.OTHER]: LOGISTICS_COURIER.PROVIDER_LABELS.OTHER,
  };
  return labels[provider] || 'Unknown';
}

export function logisticsCourierGetServiceTypeLabel(
  serviceType: LogisticsCourierServiceType
): string {
  const labels: Record<LogisticsCourierServiceType, string> = {
    [LOGISTICS_COURIER.SERVICE_TYPES.DOOR_TO_DOOR]: LOGISTICS_COURIER.SERVICE_LABELS.DOOR_TO_DOOR,
    [LOGISTICS_COURIER.SERVICE_TYPES.DOOR_TO_OFFICE]:
      LOGISTICS_COURIER.SERVICE_LABELS.DOOR_TO_OFFICE,
    [LOGISTICS_COURIER.SERVICE_TYPES.OFFICE_TO_DOOR]:
      LOGISTICS_COURIER.SERVICE_LABELS.OFFICE_TO_DOOR,
    [LOGISTICS_COURIER.SERVICE_TYPES.OFFICE_TO_OFFICE]:
      LOGISTICS_COURIER.SERVICE_LABELS.OFFICE_TO_OFFICE,
    [LOGISTICS_COURIER.SERVICE_TYPES.PICKUP_POINT]: LOGISTICS_COURIER.SERVICE_LABELS.PICKUP_POINT,
  };
  return labels[serviceType] || 'Unknown';
}

export function logisticsCourierGetPaymentMethodLabel(
  method: LogisticsCourierPaymentMethod
): string {
  const labels: Record<LogisticsCourierPaymentMethod, string> = {
    [LOGISTICS_COURIER.PAYMENT_METHODS.PREPAID]: LOGISTICS_COURIER.PAYMENT_LABELS.PREPAID,
    [LOGISTICS_COURIER.PAYMENT_METHODS.POSTPAID]: LOGISTICS_COURIER.PAYMENT_LABELS.POSTPAID,
    [LOGISTICS_COURIER.PAYMENT_METHODS.COD]: LOGISTICS_COURIER.PAYMENT_LABELS.COD,
    [LOGISTICS_COURIER.PAYMENT_METHODS.MONTHLY]: LOGISTICS_COURIER.PAYMENT_LABELS.MONTHLY,
  };
  return labels[method] || 'Unknown';
}

export function logisticsCourierGetContact(provider: LogisticsCourierProvider): string {
  const contacts: Record<LogisticsCourierProvider, string> = {
    [LOGISTICS_COURIER.PROVIDERS.SA_PARIBOHON]: LOGISTICS_COURIER.CONTACTS.SA_PARIBOHON,
    [LOGISTICS_COURIER.PROVIDERS.PAPERFLY]: LOGISTICS_COURIER.CONTACTS.PAPERFLY,
    [LOGISTICS_COURIER.PROVIDERS.REDX]: LOGISTICS_COURIER.CONTACTS.REDX,
    [LOGISTICS_COURIER.PROVIDERS.PATHO]: LOGISTICS_COURIER.CONTACTS.PATHO,
    [LOGISTICS_COURIER.PROVIDERS.SUNDARBAN]: LOGISTICS_COURIER.CONTACTS.SUNDARBAN,
    [LOGISTICS_COURIER.PROVIDERS.KARATOYA]: LOGISTICS_COURIER.CONTACTS.KARATOYA,
    [LOGISTICS_COURIER.PROVIDERS.JANATA]: LOGISTICS_COURIER.CONTACTS.JANATA,
    [LOGISTICS_COURIER.PROVIDERS.DESH]: LOGISTICS_COURIER.CONTACTS.DESH,
    [LOGISTICS_COURIER.PROVIDERS.CONTINENTAL]: LOGISTICS_COURIER.CONTACTS.CONTINENTAL,
    [LOGISTICS_COURIER.PROVIDERS.DHL]: LOGISTICS_COURIER.CONTACTS.DHL,
    [LOGISTICS_COURIER.PROVIDERS.FEDEX]: LOGISTICS_COURIER.CONTACTS.FEDEX,
    [LOGISTICS_COURIER.PROVIDERS.OTHER]: LOGISTICS_COURIER.CONTACTS.OTHER,
  };
  return contacts[provider] || 'N/A';
}

export function logisticsCourierGetWebsite(provider: LogisticsCourierProvider): string {
  const websites: Record<LogisticsCourierProvider, string> = {
    [LOGISTICS_COURIER.PROVIDERS.SA_PARIBOHON]: LOGISTICS_COURIER.WEBSITES.SA_PARIBOHON,
    [LOGISTICS_COURIER.PROVIDERS.PAPERFLY]: LOGISTICS_COURIER.WEBSITES.PAPERFLY,
    [LOGISTICS_COURIER.PROVIDERS.REDX]: LOGISTICS_COURIER.WEBSITES.REDX,
    [LOGISTICS_COURIER.PROVIDERS.PATHO]: LOGISTICS_COURIER.WEBSITES.PATHO,
    [LOGISTICS_COURIER.PROVIDERS.SUNDARBAN]: LOGISTICS_COURIER.WEBSITES.SUNDARBAN,
    [LOGISTICS_COURIER.PROVIDERS.KARATOYA]: LOGISTICS_COURIER.WEBSITES.KARATOYA,
    [LOGISTICS_COURIER.PROVIDERS.JANATA]: LOGISTICS_COURIER.WEBSITES.JANATA,
    [LOGISTICS_COURIER.PROVIDERS.DESH]: LOGISTICS_COURIER.WEBSITES.DESH,
    [LOGISTICS_COURIER.PROVIDERS.CONTINENTAL]: LOGISTICS_COURIER.WEBSITES.CONTINENTAL,
    [LOGISTICS_COURIER.PROVIDERS.DHL]: LOGISTICS_COURIER.WEBSITES.DHL,
    [LOGISTICS_COURIER.PROVIDERS.FEDEX]: LOGISTICS_COURIER.WEBSITES.FEDEX,
    [LOGISTICS_COURIER.PROVIDERS.OTHER]: LOGISTICS_COURIER.WEBSITES.OTHER,
  };
  return websites[provider] || 'N/A';
}

export function logisticsCourierIsActive(status: LogisticsCourierStatus): boolean {
  return status === LOGISTICS_COURIER.STATUS.ACTIVE;
}

export function logisticsCourierIsAvailable(status: LogisticsCourierStatus): boolean {
  const availableStatuses: LogisticsCourierStatus[] = [
    LOGISTICS_COURIER.STATUS.ACTIVE,
    LOGISTICS_COURIER.STATUS.MAINTENANCE,
  ];
  return availableStatuses.includes(status);
}

export function logisticsCourierGetDeliveryTime(type: LogisticsCourierType): number {
  const times: Record<LogisticsCourierType, number> = {
    [LOGISTICS_COURIER.TYPES.LOCAL]: LOGISTICS_COURIER.DELIVERY_TIME.LOCAL,
    [LOGISTICS_COURIER.TYPES.NATIONAL]: LOGISTICS_COURIER.DELIVERY_TIME.NATIONAL,
    [LOGISTICS_COURIER.TYPES.INTERNATIONAL]: LOGISTICS_COURIER.DELIVERY_TIME.INTERNATIONAL,
    [LOGISTICS_COURIER.TYPES.EXPRESS]: LOGISTICS_COURIER.DELIVERY_TIME.EXPRESS,
    [LOGISTICS_COURIER.TYPES.STANDARD]: LOGISTICS_COURIER.DELIVERY_TIME.STANDARD,
    [LOGISTICS_COURIER.TYPES.ECONOMY]: LOGISTICS_COURIER.DELIVERY_TIME.ECONOMY,
  };
  return times[type] || LOGISTICS_COURIER.DELIVERY_TIME.STANDARD;
}
