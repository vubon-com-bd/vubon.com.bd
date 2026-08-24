/**
 * Vendor Shipping Constants (Bangladesh)
 * Configuration for vendor shipping with Bangladeshi courier services
 */

export const VENDOR_SHIPPING = {
  // Shipping Types
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    SAME_DAY: 'same_day',
    INTERNATIONAL: 'international',
  } as const,

  // Shipping Statuses
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
  } as const,

  // Bangladeshi Courier Services
  CARRIERS: {
    SUNDARBAN: 'sundarban',
    KORIYAR: 'koriyar',
    REDX: 'redx',
    PAPERFLY: 'paperfly',
    PATHAO: 'pathao',
    STEADFAST: 'steadfast',
    E_COURIER: 'e_courier',
    BANGLADESH_COURIER: 'bangladesh_courier',
    SA_PARIBOHAN: 'sa_paribohan',
    CONTINENTAL: 'continental',
    EAGLE: 'eagle',
    ALIF: 'alif',
    ANONDO: 'anondo',
    DESH: 'desh',
    KARTOOZ: 'kartooze',
    FLASH: 'flash',
  } as const,

  // Shipping Methods
  METHODS: {
    DOOR_TO_DOOR: 'door_to_door',
    PICKUP: 'pickup',
    DROP_OFF: 'drop_off',
    LOCKER: 'locker',
    LOCAL_DELIVERY: 'local_delivery',
  } as const,

  // Shipping Zones (Bangladesh)
  ZONES: {
    DHAKA: 'dhaka',
    DHAKA_SUBURB: 'dhaka_suburb',
    CHITTAGONG: 'chittagong',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISAL: 'barisal',
    SYLHET: 'sylhet',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
    OUTSIDE_DHAKA: 'outside_dhaka',
    REMOTE_AREA: 'remote_area',
    INTERNATIONAL: 'international',
  } as const,

  // Courier Costs (in BDT)
  COURIER_COSTS: {
    sundarban: {
      dhaka: 55,
      dhaka_suburb: 70,
      chittagong: 85,
      rajshahi: 85,
      khulna: 85,
      barisal: 90,
      sylhet: 90,
      rangpur: 95,
      mymensingh: 80,
      remote: 130,
    },
    koriyar: {
      dhaka: 45,
      dhaka_suburb: 60,
      chittagong: 75,
      rajshahi: 75,
      khulna: 75,
      barisal: 80,
      sylhet: 80,
      rangpur: 85,
      mymensingh: 70,
      remote: 120,
    },
    redx: {
      dhaka: 65,
      dhaka_suburb: 80,
      chittagong: 100,
      rajshahi: 100,
      khulna: 100,
      barisal: 105,
      sylhet: 105,
      rangpur: 110,
      mymensingh: 95,
      remote: 160,
    },
    paperfly: {
      dhaka: 50,
      dhaka_suburb: 65,
      chittagong: 80,
      rajshahi: 80,
      khulna: 80,
      barisal: 85,
      sylhet: 85,
      rangpur: 90,
      mymensingh: 75,
      remote: 125,
    },
    pathao: {
      dhaka: 60,
      dhaka_suburb: 75,
      chittagong: 95,
      rajshahi: 95,
      khulna: 95,
      barisal: 100,
      sylhet: 100,
      rangpur: 105,
      mymensingh: 90,
      remote: 150,
    },
    steadfast: {
      dhaka: 55,
      dhaka_suburb: 70,
      chittagong: 88,
      rajshahi: 88,
      khulna: 88,
      barisal: 93,
      sylhet: 93,
      rangpur: 98,
      mymensingh: 82,
      remote: 140,
    },
    e_courier: {
      dhaka: 45,
      dhaka_suburb: 60,
      chittagong: 75,
      rajshahi: 75,
      khulna: 75,
      barisal: 80,
      sylhet: 80,
      rangpur: 85,
      mymensingh: 70,
      remote: 120,
    },
    bangladesh_courier: {
      dhaka: 50,
      dhaka_suburb: 65,
      chittagong: 80,
      rajshahi: 80,
      khulna: 80,
      barisal: 85,
      sylhet: 85,
      rangpur: 90,
      mymensingh: 75,
      remote: 130,
    },
    sa_paribohan: {
      dhaka: 48,
      dhaka_suburb: 63,
      chittagong: 78,
      rajshahi: 78,
      khulna: 78,
      barisal: 83,
      sylhet: 83,
      rangpur: 88,
      mymensingh: 73,
      remote: 128,
    },
    continental: {
      dhaka: 58,
      dhaka_suburb: 73,
      chittagong: 88,
      rajshahi: 88,
      khulna: 88,
      barisal: 93,
      sylhet: 93,
      rangpur: 98,
      mymensingh: 82,
      remote: 140,
    },
    eagle: {
      dhaka: 52,
      dhaka_suburb: 67,
      chittagong: 82,
      rajshahi: 82,
      khulna: 82,
      barisal: 87,
      sylhet: 87,
      rangpur: 92,
      mymensingh: 77,
      remote: 135,
    },
    alif: {
      dhaka: 50,
      dhaka_suburb: 65,
      chittagong: 80,
      rajshahi: 80,
      khulna: 80,
      barisal: 85,
      sylhet: 85,
      rangpur: 90,
      mymensingh: 75,
      remote: 130,
    },
    anondo: {
      dhaka: 55,
      dhaka_suburb: 70,
      chittagong: 85,
      rajshahi: 85,
      khulna: 85,
      barisal: 90,
      sylhet: 90,
      rangpur: 95,
      mymensingh: 80,
      remote: 135,
    },
    desh: {
      dhaka: 50,
      dhaka_suburb: 65,
      chittagong: 80,
      rajshahi: 80,
      khulna: 80,
      barisal: 85,
      sylhet: 85,
      rangpur: 90,
      mymensingh: 75,
      remote: 130,
    },
    kartooze: {
      dhaka: 48,
      dhaka_suburb: 62,
      chittagong: 76,
      rajshahi: 76,
      khulna: 76,
      barisal: 81,
      sylhet: 81,
      rangpur: 86,
      mymensingh: 71,
      remote: 125,
    },
    flash: {
      dhaka: 62,
      dhaka_suburb: 78,
      chittagong: 98,
      rajshahi: 98,
      khulna: 98,
      barisal: 103,
      sylhet: 103,
      rangpur: 108,
      mymensingh: 93,
      remote: 155,
    },
  } as const,

  // Express Delivery Costs (in BDT)
  EXPRESS_COSTS: {
    DHAKA: 120,
    DHAKA_SUBURB: 150,
    CHITTAGONG: 200,
    RAJSHAHI: 200,
    KHULNA: 200,
    BARISAL: 220,
    SYLHET: 220,
    RANGPUR: 240,
    MYMENSINGH: 190,
    REMOTE: 300,
  } as const,

  // Overnight Delivery Costs (in BDT)
  OVERNIGHT_COSTS: {
    DHAKA: 180,
    DHAKA_SUBURB: 220,
    CHITTAGONG: 300,
    RAJSHAHI: 300,
    KHULNA: 300,
    BARISAL: 330,
    SYLHET: 330,
    RANGPUR: 360,
    MYMENSINGH: 280,
    REMOTE: 450,
  } as const,

  // Same Day Delivery Costs (in BDT)
  SAME_DAY_COSTS: {
    DHAKA: 250,
    DHAKA_SUBURB: 350,
  } as const,

  // International Shipping Costs (in BDT)
  INTERNATIONAL_COSTS: {
    STANDARD: 1500,
    EXPRESS: 2500,
  } as const,

  // Free Shipping Threshold (in BDT)
  FREE_SHIPPING_THRESHOLD: 1000,

  // Delivery Times (in days)
  DELIVERY_TIMES: {
    DHAKA: 1,
    DHAKA_SUBURB: 2,
    CHITTAGONG: 2,
    RAJSHAHI: 2,
    KHULNA: 2,
    BARISAL: 3,
    SYLHET: 2,
    RANGPUR: 3,
    MYMENSINGH: 2,
    REMOTE: 4,
    INTERNATIONAL: 14,
  } as const,

  // Cash on Delivery (COD) Charges (in BDT)
  COD_CHARGES: {
    BELOW_500: 30,
    BELOW_1000: 40,
    BELOW_3000: 50,
    BELOW_5000: 60,
    BELOW_10000: 70,
    ABOVE_10000: 80,
  } as const,

  // Weight Limits (in kg)
  WEIGHT_LIMITS: {
    STANDARD: 10,
    EXPRESS: 20,
    OVERNIGHT: 30,
    SAME_DAY: 5,
    INTERNATIONAL: 50,
  } as const,
} as const;

// Shipping Types
export type VendorShippingType = (typeof VENDOR_SHIPPING.TYPES)[keyof typeof VENDOR_SHIPPING.TYPES];

// Shipping Statuses
export type VendorShippingStatus =
  (typeof VENDOR_SHIPPING.STATUS)[keyof typeof VENDOR_SHIPPING.STATUS];

// Bangladeshi Carriers
export type VendorShippingCarrier =
  (typeof VENDOR_SHIPPING.CARRIERS)[keyof typeof VENDOR_SHIPPING.CARRIERS];

// Shipping Methods
export type VendorShippingMethod =
  (typeof VENDOR_SHIPPING.METHODS)[keyof typeof VENDOR_SHIPPING.METHODS];

// Shipping Zones
export type VendorShippingZone = (typeof VENDOR_SHIPPING.ZONES)[keyof typeof VENDOR_SHIPPING.ZONES];

// Utility Functions
export function vendorShippingGetTypeLabel(type: VendorShippingType): string {
  const labels: Record<VendorShippingType, string> = {
    [VENDOR_SHIPPING.TYPES.STANDARD]: 'Standard Shipping',
    [VENDOR_SHIPPING.TYPES.EXPRESS]: 'Express Shipping',
    [VENDOR_SHIPPING.TYPES.OVERNIGHT]: 'Overnight Shipping',
    [VENDOR_SHIPPING.TYPES.SAME_DAY]: 'Same Day Shipping',
    [VENDOR_SHIPPING.TYPES.INTERNATIONAL]: 'International Shipping',
  };
  return labels[type] || 'Unknown';
}

export function vendorShippingGetStatusLabel(status: VendorShippingStatus): string {
  const labels: Record<VendorShippingStatus, string> = {
    [VENDOR_SHIPPING.STATUS.PENDING]: 'Pending',
    [VENDOR_SHIPPING.STATUS.PROCESSING]: 'Processing',
    [VENDOR_SHIPPING.STATUS.SHIPPED]: 'Shipped',
    [VENDOR_SHIPPING.STATUS.IN_TRANSIT]: 'In Transit',
    [VENDOR_SHIPPING.STATUS.DELIVERED]: 'Delivered',
    [VENDOR_SHIPPING.STATUS.FAILED]: 'Failed',
    [VENDOR_SHIPPING.STATUS.RETURNED]: 'Returned',
  };
  return labels[status] || 'Unknown';
}

export function vendorShippingGetCarrierLabel(carrier: VendorShippingCarrier): string {
  const labels: Record<VendorShippingCarrier, string> = {
    [VENDOR_SHIPPING.CARRIERS.SUNDARBAN]: 'Sundarban Courier',
    [VENDOR_SHIPPING.CARRIERS.KORIYAR]: 'Kor✌️ar Service',
    [VENDOR_SHIPPING.CARRIERS.REDX]: 'RedX',
    [VENDOR_SHIPPING.CARRIERS.PAPERFLY]: 'Paperfly',
    [VENDOR_SHIPPING.CARRIERS.PATHAO]: 'Pathao',
    [VENDOR_SHIPPING.CARRIERS.STEADFAST]: 'Steadfast',
    [VENDOR_SHIPPING.CARRIERS.E_COURIER]: 'E-Courier',
    [VENDOR_SHIPPING.CARRIERS.BANGLADESH_COURIER]: 'Bangladesh Courier',
    [VENDOR_SHIPPING.CARRIERS.SA_PARIBOHAN]: 'SA Paribohan',
    [VENDOR_SHIPPING.CARRIERS.CONTINENTAL]: 'Continental',
    [VENDOR_SHIPPING.CARRIERS.EAGLE]: 'Eagle',
    [VENDOR_SHIPPING.CARRIERS.ALIF]: 'Alif',
    [VENDOR_SHIPPING.CARRIERS.ANONDO]: 'Anondo',
    [VENDOR_SHIPPING.CARRIERS.DESH]: 'Desh',
    [VENDOR_SHIPPING.CARRIERS.KARTOOZ]: 'Kartooze',
    [VENDOR_SHIPPING.CARRIERS.FLASH]: 'Flash',
  };
  return labels[carrier] || 'Unknown';
}

export function vendorShippingGetMethodLabel(method: VendorShippingMethod): string {
  const labels: Record<VendorShippingMethod, string> = {
    [VENDOR_SHIPPING.METHODS.DOOR_TO_DOOR]: 'Door to Door',
    [VENDOR_SHIPPING.METHODS.PICKUP]: 'Pickup',
    [VENDOR_SHIPPING.METHODS.DROP_OFF]: 'Drop Off',
    [VENDOR_SHIPPING.METHODS.LOCKER]: 'Locker',
    [VENDOR_SHIPPING.METHODS.LOCAL_DELIVERY]: 'Local Delivery',
  };
  return labels[method] || 'Unknown';
}

export function vendorShippingGetZoneLabel(zone: VendorShippingZone): string {
  const labels: Record<VendorShippingZone, string> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: 'Dhaka City',
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: 'Dhaka Suburb',
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: 'Chittagong',
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: 'Rajshahi',
    [VENDOR_SHIPPING.ZONES.KHULNA]: 'Khulna',
    [VENDOR_SHIPPING.ZONES.BARISAL]: 'Barisal',
    [VENDOR_SHIPPING.ZONES.SYLHET]: 'Sylhet',
    [VENDOR_SHIPPING.ZONES.RANGPUR]: 'Rangpur',
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: 'Mymensingh',
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: 'Outside Dhaka',
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: 'Remote Area',
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: 'International',
  };
  return labels[zone] || 'Unknown';
}

export function vendorShippingIsDelivered(status: VendorShippingStatus): boolean {
  return status === VENDOR_SHIPPING.STATUS.DELIVERED;
}

export function vendorShippingIsInTransit(status: VendorShippingStatus): boolean {
  return status === VENDOR_SHIPPING.STATUS.SHIPPED || status === VENDOR_SHIPPING.STATUS.IN_TRANSIT;
}

export function vendorShippingIsFailed(status: VendorShippingStatus): boolean {
  return status === VENDOR_SHIPPING.STATUS.FAILED || status === VENDOR_SHIPPING.STATUS.RETURNED;
}

export function vendorShippingGetCarrierCost(
  carrier: VendorShippingCarrier,
  zone: VendorShippingZone
): number {
  const carrierKey = carrier.toLowerCase();
  const costs =
    VENDOR_SHIPPING.COURIER_COSTS[carrierKey as keyof typeof VENDOR_SHIPPING.COURIER_COSTS];
  if (!costs) return 80;

  const zoneMap: Record<VendorShippingZone, string> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: 'dhaka',
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: 'dhaka_suburb',
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: 'chittagong',
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: 'rajshahi',
    [VENDOR_SHIPPING.ZONES.KHULNA]: 'khulna',
    [VENDOR_SHIPPING.ZONES.BARISAL]: 'barisal',
    [VENDOR_SHIPPING.ZONES.SYLHET]: 'sylhet',
    [VENDOR_SHIPPING.ZONES.RANGPUR]: 'rangpur',
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: 'mymensingh',
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: 'outside_dhaka',
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: 'remote',
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: 'international',
  };

  const key = zoneMap[zone] || 'dhaka';
  return costs[key as keyof typeof costs] || 80;
}

export function vendorShippingGetExpressCost(zone: VendorShippingZone): number {
  const costs: Record<VendorShippingZone, number> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: VENDOR_SHIPPING.EXPRESS_COSTS.DHAKA,
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: VENDOR_SHIPPING.EXPRESS_COSTS.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: VENDOR_SHIPPING.EXPRESS_COSTS.CHITTAGONG,
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: VENDOR_SHIPPING.EXPRESS_COSTS.RAJSHAHI,
    [VENDOR_SHIPPING.ZONES.KHULNA]: VENDOR_SHIPPING.EXPRESS_COSTS.KHULNA,
    [VENDOR_SHIPPING.ZONES.BARISAL]: VENDOR_SHIPPING.EXPRESS_COSTS.BARISAL,
    [VENDOR_SHIPPING.ZONES.SYLHET]: VENDOR_SHIPPING.EXPRESS_COSTS.SYLHET,
    [VENDOR_SHIPPING.ZONES.RANGPUR]: VENDOR_SHIPPING.EXPRESS_COSTS.RANGPUR,
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: VENDOR_SHIPPING.EXPRESS_COSTS.MYMENSINGH,
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: VENDOR_SHIPPING.EXPRESS_COSTS.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: VENDOR_SHIPPING.EXPRESS_COSTS.REMOTE,
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: VENDOR_SHIPPING.INTERNATIONAL_COSTS.EXPRESS,
  };
  return costs[zone] || VENDOR_SHIPPING.EXPRESS_COSTS.DHAKA;
}

export function vendorShippingGetOvernightCost(zone: VendorShippingZone): number {
  const costs: Record<VendorShippingZone, number> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: VENDOR_SHIPPING.OVERNIGHT_COSTS.DHAKA,
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: VENDOR_SHIPPING.OVERNIGHT_COSTS.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: VENDOR_SHIPPING.OVERNIGHT_COSTS.CHITTAGONG,
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: VENDOR_SHIPPING.OVERNIGHT_COSTS.RAJSHAHI,
    [VENDOR_SHIPPING.ZONES.KHULNA]: VENDOR_SHIPPING.OVERNIGHT_COSTS.KHULNA,
    [VENDOR_SHIPPING.ZONES.BARISAL]: VENDOR_SHIPPING.OVERNIGHT_COSTS.BARISAL,
    [VENDOR_SHIPPING.ZONES.SYLHET]: VENDOR_SHIPPING.OVERNIGHT_COSTS.SYLHET,
    [VENDOR_SHIPPING.ZONES.RANGPUR]: VENDOR_SHIPPING.OVERNIGHT_COSTS.RANGPUR,
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: VENDOR_SHIPPING.OVERNIGHT_COSTS.MYMENSINGH,
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: VENDOR_SHIPPING.OVERNIGHT_COSTS.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: VENDOR_SHIPPING.OVERNIGHT_COSTS.REMOTE,
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: 0,
  };
  return costs[zone] || VENDOR_SHIPPING.OVERNIGHT_COSTS.DHAKA;
}

export function vendorShippingGetSameDayCost(zone: VendorShippingZone): number {
  const costs: Record<VendorShippingZone, number> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: VENDOR_SHIPPING.SAME_DAY_COSTS.DHAKA,
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: VENDOR_SHIPPING.SAME_DAY_COSTS.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: 0,
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: 0,
    [VENDOR_SHIPPING.ZONES.KHULNA]: 0,
    [VENDOR_SHIPPING.ZONES.BARISAL]: 0,
    [VENDOR_SHIPPING.ZONES.SYLHET]: 0,
    [VENDOR_SHIPPING.ZONES.RANGPUR]: 0,
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: 0,
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: 0,
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: 0,
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: 0,
  };
  return costs[zone] || 0;
}

export function vendorShippingGetDeliveryTime(zone: VendorShippingZone): number {
  const times: Record<VendorShippingZone, number> = {
    [VENDOR_SHIPPING.ZONES.DHAKA]: VENDOR_SHIPPING.DELIVERY_TIMES.DHAKA,
    [VENDOR_SHIPPING.ZONES.DHAKA_SUBURB]: VENDOR_SHIPPING.DELIVERY_TIMES.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.CHITTAGONG]: VENDOR_SHIPPING.DELIVERY_TIMES.CHITTAGONG,
    [VENDOR_SHIPPING.ZONES.RAJSHAHI]: VENDOR_SHIPPING.DELIVERY_TIMES.RAJSHAHI,
    [VENDOR_SHIPPING.ZONES.KHULNA]: VENDOR_SHIPPING.DELIVERY_TIMES.KHULNA,
    [VENDOR_SHIPPING.ZONES.BARISAL]: VENDOR_SHIPPING.DELIVERY_TIMES.BARISAL,
    [VENDOR_SHIPPING.ZONES.SYLHET]: VENDOR_SHIPPING.DELIVERY_TIMES.SYLHET,
    [VENDOR_SHIPPING.ZONES.RANGPUR]: VENDOR_SHIPPING.DELIVERY_TIMES.RANGPUR,
    [VENDOR_SHIPPING.ZONES.MYMENSINGH]: VENDOR_SHIPPING.DELIVERY_TIMES.MYMENSINGH,
    [VENDOR_SHIPPING.ZONES.OUTSIDE_DHAKA]: VENDOR_SHIPPING.DELIVERY_TIMES.DHAKA_SUBURB,
    [VENDOR_SHIPPING.ZONES.REMOTE_AREA]: VENDOR_SHIPPING.DELIVERY_TIMES.REMOTE,
    [VENDOR_SHIPPING.ZONES.INTERNATIONAL]: VENDOR_SHIPPING.DELIVERY_TIMES.INTERNATIONAL,
  };
  return times[zone] || VENDOR_SHIPPING.DELIVERY_TIMES.DHAKA;
}

export function vendorShippingGetCODCost(amount: number): number {
  if (amount < 500) return VENDOR_SHIPPING.COD_CHARGES.BELOW_500;
  if (amount < 1000) return VENDOR_SHIPPING.COD_CHARGES.BELOW_1000;
  if (amount < 3000) return VENDOR_SHIPPING.COD_CHARGES.BELOW_3000;
  if (amount < 5000) return VENDOR_SHIPPING.COD_CHARGES.BELOW_5000;
  if (amount < 10000) return VENDOR_SHIPPING.COD_CHARGES.BELOW_10000;
  return VENDOR_SHIPPING.COD_CHARGES.ABOVE_10000;
}

export function vendorShippingIsFree(amount: number): boolean {
  return amount >= VENDOR_SHIPPING.FREE_SHIPPING_THRESHOLD;
}

export function vendorShippingGetCheapestCarrier(zone: VendorShippingZone): VendorShippingCarrier {
  let minCost = Infinity;
  let cheapestCarrier: VendorShippingCarrier = VENDOR_SHIPPING.CARRIERS.KORIYAR;

  for (const carrier of Object.values(VENDOR_SHIPPING.CARRIERS)) {
    const cost = vendorShippingGetCarrierCost(carrier, zone);
    if (cost < minCost) {
      minCost = cost;
      cheapestCarrier = carrier;
    }
  }

  return cheapestCarrier;
}
