/**
 * Logistics Constants
 * Configuration for logistics system - Bangladesh based
 */

export const LOGISTICS = {
  // Logistics Types
  TYPES: {
    COURIER: 'courier',
    FREIGHT: 'freight',
    EXPRESS: 'express',
    STANDARD: 'standard',
    ECONOMY: 'economy',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    INTERNATIONAL: 'international',
  } as const,

  // Logistics Statuses
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
  } as const,

  // Courier Service Providers (Bangladesh)
  COURIER_SERVICES: {
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

  // Courier Service Labels (Bangladesh)
  COURIER_LABELS: {
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

  // Delivery Zones (Bangladesh)
  DELIVERY_ZONES: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    SYLHET: 'sylhet',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISHAL: 'barishal',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
    ALL: 'all',
  } as const,

  // Delivery Zone Labels
  DELIVERY_ZONE_LABELS: {
    DHAKA: 'Dhaka Division',
    CHITTAGONG: 'Chittagong Division',
    SYLHET: 'Sylhet Division',
    RAJSHAHI: 'Rajshahi Division',
    KHULNA: 'Khulna Division',
    BARISHAL: 'Barishal Division',
    RANGPUR: 'Rangpur Division',
    MYMENSINGH: 'Mymensingh Division',
    ALL: 'All Divisions',
  } as const,

  // Service Types (Bangladesh Courier)
  SERVICE_TYPES: {
    REGULAR: 'regular',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    SAME_DAY: 'same_day',
    TWO_DAY: 'two_day',
    DOCUMENT: 'document',
    PACKAGE: 'package',
    CARGO: 'cargo',
  } as const,

  // Payment Methods
  PAYMENT_METHODS: {
    CASH: 'cash',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    CARD: 'card',
    BANK: 'bank',
    COLLECT: 'collect', // Cash on Delivery
  } as const,

  // Service Time Slots
  TIME_SLOTS: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    ANY: 'any',
  } as const,

  // Logistics Limits
  LIMITS: {
    MAX_WEIGHT_KG: 50,
    MAX_LENGTH_CM: 100,
    MAX_WIDTH_CM: 100,
    MAX_HEIGHT_CM: 100,
    MAX_VOLUME_CM3: 1000000,
    MAX_ITEMS: 100,
    MAX_PACKAGES: 10,
  } as const,

  // Tracking Statuses
  TRACKING_STATUS: {
    BOOKED: 'booked',
    PICKED: 'picked',
    PROCESSED: 'processed',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    ARRIVED: 'arrived',
    OUT_DELIVERY: 'out_delivery',
    DELIVERED: 'delivered',
    RETURNED: 'returned',
  } as const,
} as const;

// Logistics Types
export type LogisticsType = (typeof LOGISTICS.TYPES)[keyof typeof LOGISTICS.TYPES];

// Logistics Statuses
export type LogisticsStatus = (typeof LOGISTICS.STATUS)[keyof typeof LOGISTICS.STATUS];

// Courier Services
export type LogisticsCourierService =
  (typeof LOGISTICS.COURIER_SERVICES)[keyof typeof LOGISTICS.COURIER_SERVICES];

// Delivery Zones
export type LogisticsDeliveryZone =
  (typeof LOGISTICS.DELIVERY_ZONES)[keyof typeof LOGISTICS.DELIVERY_ZONES];

// Service Types
export type LogisticsServiceType =
  (typeof LOGISTICS.SERVICE_TYPES)[keyof typeof LOGISTICS.SERVICE_TYPES];

// Payment Methods
export type LogisticsPaymentMethod =
  (typeof LOGISTICS.PAYMENT_METHODS)[keyof typeof LOGISTICS.PAYMENT_METHODS];

// Time Slots
export type LogisticsTimeSlot = (typeof LOGISTICS.TIME_SLOTS)[keyof typeof LOGISTICS.TIME_SLOTS];

// Tracking Status
export type LogisticsTrackingStatus =
  (typeof LOGISTICS.TRACKING_STATUS)[keyof typeof LOGISTICS.TRACKING_STATUS];

// Utility Functions
export function logisticsGetTypeLabel(type: LogisticsType): string {
  const labels: Record<LogisticsType, string> = {
    [LOGISTICS.TYPES.COURIER]: 'Courier',
    [LOGISTICS.TYPES.FREIGHT]: 'Freight',
    [LOGISTICS.TYPES.EXPRESS]: 'Express',
    [LOGISTICS.TYPES.STANDARD]: 'Standard',
    [LOGISTICS.TYPES.ECONOMY]: 'Economy',
    [LOGISTICS.TYPES.SAME_DAY]: 'Same Day',
    [LOGISTICS.TYPES.NEXT_DAY]: 'Next Day',
    [LOGISTICS.TYPES.INTERNATIONAL]: 'International',
  };
  return labels[type] || 'Unknown';
}

export function logisticsGetStatusLabel(status: LogisticsStatus): string {
  const labels: Record<LogisticsStatus, string> = {
    [LOGISTICS.STATUS.PENDING]: 'Pending',
    [LOGISTICS.STATUS.PROCESSING]: 'Processing',
    [LOGISTICS.STATUS.PICKED_UP]: 'Picked Up',
    [LOGISTICS.STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS.STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [LOGISTICS.STATUS.DELIVERED]: 'Delivered',
    [LOGISTICS.STATUS.FAILED]: 'Failed',
    [LOGISTICS.STATUS.RETURNED]: 'Returned',
    [LOGISTICS.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function logisticsGetCourierLabel(service: LogisticsCourierService): string {
  const labels: Record<LogisticsCourierService, string> = {
    [LOGISTICS.COURIER_SERVICES.SA_PARIBOHON]: LOGISTICS.COURIER_LABELS.SA_PARIBOHON,
    [LOGISTICS.COURIER_SERVICES.PAPERFLY]: LOGISTICS.COURIER_LABELS.PAPERFLY,
    [LOGISTICS.COURIER_SERVICES.REDX]: LOGISTICS.COURIER_LABELS.REDX,
    [LOGISTICS.COURIER_SERVICES.PATHO]: LOGISTICS.COURIER_LABELS.PATHO,
    [LOGISTICS.COURIER_SERVICES.SUNDARBAN]: LOGISTICS.COURIER_LABELS.SUNDARBAN,
    [LOGISTICS.COURIER_SERVICES.KARATOYA]: LOGISTICS.COURIER_LABELS.KARATOYA,
    [LOGISTICS.COURIER_SERVICES.JANATA]: LOGISTICS.COURIER_LABELS.JANATA,
    [LOGISTICS.COURIER_SERVICES.DESH]: LOGISTICS.COURIER_LABELS.DESH,
    [LOGISTICS.COURIER_SERVICES.CONTINENTAL]: LOGISTICS.COURIER_LABELS.CONTINENTAL,
    [LOGISTICS.COURIER_SERVICES.DHL]: LOGISTICS.COURIER_LABELS.DHL,
    [LOGISTICS.COURIER_SERVICES.FEDEX]: LOGISTICS.COURIER_LABELS.FEDEX,
    [LOGISTICS.COURIER_SERVICES.OTHER]: LOGISTICS.COURIER_LABELS.OTHER,
  };
  return labels[service] || 'Unknown';
}

export function logisticsGetZoneLabel(zone: LogisticsDeliveryZone): string {
  const labels: Record<LogisticsDeliveryZone, string> = {
    [LOGISTICS.DELIVERY_ZONES.DHAKA]: LOGISTICS.DELIVERY_ZONE_LABELS.DHAKA,
    [LOGISTICS.DELIVERY_ZONES.CHITTAGONG]: LOGISTICS.DELIVERY_ZONE_LABELS.CHITTAGONG,
    [LOGISTICS.DELIVERY_ZONES.SYLHET]: LOGISTICS.DELIVERY_ZONE_LABELS.SYLHET,
    [LOGISTICS.DELIVERY_ZONES.RAJSHAHI]: LOGISTICS.DELIVERY_ZONE_LABELS.RAJSHAHI,
    [LOGISTICS.DELIVERY_ZONES.KHULNA]: LOGISTICS.DELIVERY_ZONE_LABELS.KHULNA,
    [LOGISTICS.DELIVERY_ZONES.BARISHAL]: LOGISTICS.DELIVERY_ZONE_LABELS.BARISHAL,
    [LOGISTICS.DELIVERY_ZONES.RANGPUR]: LOGISTICS.DELIVERY_ZONE_LABELS.RANGPUR,
    [LOGISTICS.DELIVERY_ZONES.MYMENSINGH]: LOGISTICS.DELIVERY_ZONE_LABELS.MYMENSINGH,
    [LOGISTICS.DELIVERY_ZONES.ALL]: LOGISTICS.DELIVERY_ZONE_LABELS.ALL,
  };
  return labels[zone] || 'Unknown';
}

export function logisticsGetServiceTypeLabel(serviceType: LogisticsServiceType): string {
  const labels: Record<LogisticsServiceType, string> = {
    [LOGISTICS.SERVICE_TYPES.REGULAR]: 'Regular',
    [LOGISTICS.SERVICE_TYPES.EXPRESS]: 'Express',
    [LOGISTICS.SERVICE_TYPES.OVERNIGHT]: 'Overnight',
    [LOGISTICS.SERVICE_TYPES.SAME_DAY]: 'Same Day',
    [LOGISTICS.SERVICE_TYPES.TWO_DAY]: '2 Day',
    [LOGISTICS.SERVICE_TYPES.DOCUMENT]: 'Document',
    [LOGISTICS.SERVICE_TYPES.PACKAGE]: 'Package',
    [LOGISTICS.SERVICE_TYPES.CARGO]: 'Cargo',
  };
  return labels[serviceType] || 'Unknown';
}

export function logisticsGetPaymentMethodLabel(method: LogisticsPaymentMethod): string {
  const labels: Record<LogisticsPaymentMethod, string> = {
    [LOGISTICS.PAYMENT_METHODS.CASH]: 'Cash',
    [LOGISTICS.PAYMENT_METHODS.BKASH]: 'bKash',
    [LOGISTICS.PAYMENT_METHODS.NAGAD]: 'Nagad',
    [LOGISTICS.PAYMENT_METHODS.ROCKET]: 'Rocket',
    [LOGISTICS.PAYMENT_METHODS.CARD]: 'Card',
    [LOGISTICS.PAYMENT_METHODS.BANK]: 'Bank Transfer',
    [LOGISTICS.PAYMENT_METHODS.COLLECT]: 'Cash on Delivery',
  };
  return labels[method] || 'Unknown';
}

export function logisticsGetTimeSlotLabel(timeSlot: LogisticsTimeSlot): string {
  const labels: Record<LogisticsTimeSlot, string> = {
    [LOGISTICS.TIME_SLOTS.MORNING]: 'Morning (9AM - 1PM)',
    [LOGISTICS.TIME_SLOTS.AFTERNOON]: 'Afternoon (2PM - 6PM)',
    [LOGISTICS.TIME_SLOTS.EVENING]: 'Evening (6PM - 9PM)',
    [LOGISTICS.TIME_SLOTS.ANY]: 'Any Time',
  };
  return labels[timeSlot] || 'Unknown';
}

export function logisticsGetTrackingStatusLabel(status: LogisticsTrackingStatus): string {
  const labels: Record<LogisticsTrackingStatus, string> = {
    [LOGISTICS.TRACKING_STATUS.BOOKED]: 'Booked',
    [LOGISTICS.TRACKING_STATUS.PICKED]: 'Picked',
    [LOGISTICS.TRACKING_STATUS.PROCESSED]: 'Processed',
    [LOGISTICS.TRACKING_STATUS.SHIPPED]: 'Shipped',
    [LOGISTICS.TRACKING_STATUS.IN_TRANSIT]: 'In Transit',
    [LOGISTICS.TRACKING_STATUS.ARRIVED]: 'Arrived',
    [LOGISTICS.TRACKING_STATUS.OUT_DELIVERY]: 'Out for Delivery',
    [LOGISTICS.TRACKING_STATUS.DELIVERED]: 'Delivered',
    [LOGISTICS.TRACKING_STATUS.RETURNED]: 'Returned',
  };
  return labels[status] || 'Unknown';
}

export function logisticsIsDelivered(status: LogisticsStatus): boolean {
  return status === LOGISTICS.STATUS.DELIVERED;
}

export function logisticsIsInTransit(status: LogisticsStatus): boolean {
  const transitStatuses: LogisticsStatus[] = [
    LOGISTICS.STATUS.PICKED_UP,
    LOGISTICS.STATUS.IN_TRANSIT,
    LOGISTICS.STATUS.OUT_FOR_DELIVERY,
  ];
  return transitStatuses.includes(status);
}

export function logisticsIsFailed(status: LogisticsStatus): boolean {
  return (
    status === LOGISTICS.STATUS.FAILED ||
    status === LOGISTICS.STATUS.RETURNED ||
    status === LOGISTICS.STATUS.CANCELLED
  );
}

export function logisticsGetCourierContact(service: LogisticsCourierService): string {
  const contacts: Record<LogisticsCourierService, string> = {
    [LOGISTICS.COURIER_SERVICES.SA_PARIBOHON]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.PAPERFLY]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.REDX]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.PATHO]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.SUNDARBAN]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.KARATOYA]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.JANATA]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.DESH]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.CONTINENTAL]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.DHL]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.FEDEX]: '+880-XXXXXXXXXX',
    [LOGISTICS.COURIER_SERVICES.OTHER]: 'N/A',
  };
  return contacts[service] || 'N/A';
}

export function logisticsGetCourierWebsite(service: LogisticsCourierService): string {
  const websites: Record<LogisticsCourierService, string> = {
    [LOGISTICS.COURIER_SERVICES.SA_PARIBOHON]: 'https://www.saparibohon.com',
    [LOGISTICS.COURIER_SERVICES.PAPERFLY]: 'https://www.paperfly.com',
    [LOGISTICS.COURIER_SERVICES.REDX]: 'https://www.redx.com.bd',
    [LOGISTICS.COURIER_SERVICES.PATHO]: 'https://www.pathao.com',
    [LOGISTICS.COURIER_SERVICES.SUNDARBAN]: 'https://www.sundarbancourier.com',
    [LOGISTICS.COURIER_SERVICES.KARATOYA]: 'https://www.karatoya.com',
    [LOGISTICS.COURIER_SERVICES.JANATA]: 'https://www.janatacourier.com',
    [LOGISTICS.COURIER_SERVICES.DESH]: 'https://www.deshcourier.com',
    [LOGISTICS.COURIER_SERVICES.CONTINENTAL]: 'https://www.continentalcourier.com',
    [LOGISTICS.COURIER_SERVICES.DHL]: 'https://www.dhl.com.bd',
    [LOGISTICS.COURIER_SERVICES.FEDEX]: 'https://www.fedex.com',
    [LOGISTICS.COURIER_SERVICES.OTHER]: 'N/A',
  };
  return websites[service] || 'N/A';
}
