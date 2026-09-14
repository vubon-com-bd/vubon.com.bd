export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in_use',
  MAINTENANCE: 'maintenance',
  OUT_OF_SERVICE: 'out_of_service',
  RETIRED: 'retired',
  RESERVED: 'reserved',
} as const;

export const VEHICLE_TYPE = {
  MOTORCYCLE: 'motorcycle',
  BICYCLE: 'bicycle',
  CAR: 'car',
  VAN: 'van',
  PICKUP: 'pickup',
  TRUCK_SMALL: 'truck_small',
  TRUCK_MEDIUM: 'truck_medium',
  TRUCK_LARGE: 'truck_large',
  CONTAINER: 'container',
  REFRIGERATED: 'refrigerated',
} as const;

export const VEHICLE_FUEL_TYPE = {
  PETROL: 'petrol',
  DIESEL: 'diesel',
  CNG: 'cng',
  ELECTRIC: 'electric',
  HYBRID: 'hybrid',
  LPG: 'lpg',
} as const;

export const VEHICLE = {
  STATUS: VEHICLE_STATUS,
  TYPE: VEHICLE_TYPE,
  FUEL_TYPE: VEHICLE_FUEL_TYPE,
  MAX_ACTIVE_VEHICLES: 5000,
  MAX_WEIGHT_KG: 20000,
  MAX_VOLUME_M3: 100,
  MIN_YEAR: 2000,
  MAX_YEAR: 2100,
  REGISTRATION_NUMBER_MAX_LENGTH: 30,
  MAINTENANCE_INTERVAL_DAYS: 90,
  INSURANCE_EXPIRY_WARNING_DAYS: 30,
  REQUIRE_INSURANCE: true,
  REQUIRE_REGISTRATION: true,
  ALLOW_TRACKING: true,
} as const;

export type VehicleStatusType = (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];
export type VehicleTypeType = (typeof VEHICLE_TYPE)[keyof typeof VEHICLE_TYPE];
export type VehicleFuelTypeType = (typeof VEHICLE_FUEL_TYPE)[keyof typeof VEHICLE_FUEL_TYPE];
