/**
 * Vehicle Constants
 * Configuration for vehicles - Bangladesh based
 */

export const LOGISTICS_VEHICLE = {
  // Vehicle Types
  TYPES: {
    BIKE: 'bike',
    CAR: 'car',
    VAN: 'van',
    TRUCK: 'truck',
    PICKUP: 'pickup',
    BUS: 'bus',
    TEMPO: 'tempo',
    CNG: 'cng',
    SHIP: 'ship',
    PLANE: 'plane',
  } as const,

  // Vehicle Statuses
  STATUS: {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    REPAIR: 'repair',
    REFUELING: 'refueling',
    OFF_DUTY: 'off_duty',
    ON_DUTY: 'on_duty',
  } as const,

  // Vehicle Capacities
  CAPACITIES: {
    BIKE: { weight: 100, volume: 0.5, passengers: 1 },
    CAR: { weight: 500, volume: 2, passengers: 4 },
    VAN: { weight: 1000, volume: 5, passengers: 6 },
    PICKUP: { weight: 1500, volume: 7, passengers: 3 },
    TRUCK: { weight: 5000, volume: 20, passengers: 3 },
    BUS: { weight: 8000, volume: 30, passengers: 40 },
    TEMPO: { weight: 800, volume: 4, passengers: 8 },
    CNG: { weight: 400, volume: 1.5, passengers: 3 },
    SHIP: { weight: 50000, volume: 500, passengers: 100 },
    PLANE: { weight: 100000, volume: 1000, passengers: 200 },
  } as const,

  // Vehicle Fuel Types
  FUEL_TYPES: {
    PETROL: 'petrol',
    DIESEL: 'diesel',
    CNG: 'cng',
    ELECTRIC: 'electric',
    HYBRID: 'hybrid',
    AVIATION: 'aviation',
    MARINE: 'marine',
  } as const,

  // Vehicle Conditions
  CONDITIONS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    REPAIR_NEEDED: 'repair_needed',
  } as const,

  // Vehicle Registration Types (Bangladesh)
  REGISTRATION_TYPES: {
    PRIVATE: 'private',
    COMMERCIAL: 'commercial',
    GOVERNMENT: 'government',
    RENTAL: 'rental',
  } as const,

  // Vehicle Limits
  LIMITS: {
    MAX_SPEED_KPH: 120,
    MAX_FUEL_LITERS: 100,
    MAX_SERVICE_INTERVAL_DAYS: 90,
    MAX_INSURANCE_DAYS: 365,
    MAX_FITNESS_DAYS: 365,
  } as const,
} as const;

// Vehicle Types
export type LogisticsVehicleType =
  (typeof LOGISTICS_VEHICLE.TYPES)[keyof typeof LOGISTICS_VEHICLE.TYPES];

// Vehicle Statuses
export type LogisticsVehicleStatus =
  (typeof LOGISTICS_VEHICLE.STATUS)[keyof typeof LOGISTICS_VEHICLE.STATUS];

// Fuel Types
export type LogisticsVehicleFuelType =
  (typeof LOGISTICS_VEHICLE.FUEL_TYPES)[keyof typeof LOGISTICS_VEHICLE.FUEL_TYPES];

// Vehicle Conditions
export type LogisticsVehicleCondition =
  (typeof LOGISTICS_VEHICLE.CONDITIONS)[keyof typeof LOGISTICS_VEHICLE.CONDITIONS];

// Registration Types
export type LogisticsVehicleRegistrationType =
  (typeof LOGISTICS_VEHICLE.REGISTRATION_TYPES)[keyof typeof LOGISTICS_VEHICLE.REGISTRATION_TYPES];

// Utility Functions
export function logisticsVehicleGetTypeLabel(type: LogisticsVehicleType): string {
  const labels: Record<LogisticsVehicleType, string> = {
    [LOGISTICS_VEHICLE.TYPES.BIKE]: 'Bike',
    [LOGISTICS_VEHICLE.TYPES.CAR]: 'Car',
    [LOGISTICS_VEHICLE.TYPES.VAN]: 'Van',
    [LOGISTICS_VEHICLE.TYPES.TRUCK]: 'Truck',
    [LOGISTICS_VEHICLE.TYPES.PICKUP]: 'Pickup',
    [LOGISTICS_VEHICLE.TYPES.BUS]: 'Bus',
    [LOGISTICS_VEHICLE.TYPES.TEMPO]: 'Tempo',
    [LOGISTICS_VEHICLE.TYPES.CNG]: 'CNG',
    [LOGISTICS_VEHICLE.TYPES.SHIP]: 'Ship',
    [LOGISTICS_VEHICLE.TYPES.PLANE]: 'Plane',
  };
  return labels[type] || 'Unknown';
}

export function logisticsVehicleGetStatusLabel(status: LogisticsVehicleStatus): string {
  const labels: Record<LogisticsVehicleStatus, string> = {
    [LOGISTICS_VEHICLE.STATUS.AVAILABLE]: 'Available',
    [LOGISTICS_VEHICLE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_VEHICLE.STATUS.INACTIVE]: 'Inactive',
    [LOGISTICS_VEHICLE.STATUS.MAINTENANCE]: 'Maintenance',
    [LOGISTICS_VEHICLE.STATUS.REPAIR]: 'Repair',
    [LOGISTICS_VEHICLE.STATUS.REFUELING]: 'Refueling',
    [LOGISTICS_VEHICLE.STATUS.OFF_DUTY]: 'Off Duty',
    [LOGISTICS_VEHICLE.STATUS.ON_DUTY]: 'On Duty',
  };
  return labels[status] || 'Unknown';
}

export function logisticsVehicleGetFuelTypeLabel(fuelType: LogisticsVehicleFuelType): string {
  const labels: Record<LogisticsVehicleFuelType, string> = {
    [LOGISTICS_VEHICLE.FUEL_TYPES.PETROL]: 'Petrol',
    [LOGISTICS_VEHICLE.FUEL_TYPES.DIESEL]: 'Diesel',
    [LOGISTICS_VEHICLE.FUEL_TYPES.CNG]: 'CNG',
    [LOGISTICS_VEHICLE.FUEL_TYPES.ELECTRIC]: 'Electric',
    [LOGISTICS_VEHICLE.FUEL_TYPES.HYBRID]: 'Hybrid',
    [LOGISTICS_VEHICLE.FUEL_TYPES.AVIATION]: 'Aviation Fuel',
    [LOGISTICS_VEHICLE.FUEL_TYPES.MARINE]: 'Marine Fuel',
  };
  return labels[fuelType] || 'Unknown';
}

export function logisticsVehicleGetConditionLabel(condition: LogisticsVehicleCondition): string {
  const labels: Record<LogisticsVehicleCondition, string> = {
    [LOGISTICS_VEHICLE.CONDITIONS.EXCELLENT]: 'Excellent',
    [LOGISTICS_VEHICLE.CONDITIONS.GOOD]: 'Good',
    [LOGISTICS_VEHICLE.CONDITIONS.FAIR]: 'Fair',
    [LOGISTICS_VEHICLE.CONDITIONS.POOR]: 'Poor',
    [LOGISTICS_VEHICLE.CONDITIONS.REPAIR_NEEDED]: 'Repair Needed',
  };
  return labels[condition] || 'Unknown';
}

export function logisticsVehicleGetRegistrationTypeLabel(
  registrationType: LogisticsVehicleRegistrationType
): string {
  const labels: Record<LogisticsVehicleRegistrationType, string> = {
    [LOGISTICS_VEHICLE.REGISTRATION_TYPES.PRIVATE]: 'Private',
    [LOGISTICS_VEHICLE.REGISTRATION_TYPES.COMMERCIAL]: 'Commercial',
    [LOGISTICS_VEHICLE.REGISTRATION_TYPES.GOVERNMENT]: 'Government',
    [LOGISTICS_VEHICLE.REGISTRATION_TYPES.RENTAL]: 'Rental',
  };
  return labels[registrationType] || 'Unknown';
}

export function logisticsVehicleGetCapacity(type: LogisticsVehicleType): {
  weight: number;
  volume: number;
  passengers: number;
} {
  const capacities: Record<
    LogisticsVehicleType,
    { weight: number; volume: number; passengers: number }
  > = {
    [LOGISTICS_VEHICLE.TYPES.BIKE]: LOGISTICS_VEHICLE.CAPACITIES.BIKE,
    [LOGISTICS_VEHICLE.TYPES.CAR]: LOGISTICS_VEHICLE.CAPACITIES.CAR,
    [LOGISTICS_VEHICLE.TYPES.VAN]: LOGISTICS_VEHICLE.CAPACITIES.VAN,
    [LOGISTICS_VEHICLE.TYPES.PICKUP]: LOGISTICS_VEHICLE.CAPACITIES.PICKUP,
    [LOGISTICS_VEHICLE.TYPES.TRUCK]: LOGISTICS_VEHICLE.CAPACITIES.TRUCK,
    [LOGISTICS_VEHICLE.TYPES.BUS]: LOGISTICS_VEHICLE.CAPACITIES.BUS,
    [LOGISTICS_VEHICLE.TYPES.TEMPO]: LOGISTICS_VEHICLE.CAPACITIES.TEMPO,
    [LOGISTICS_VEHICLE.TYPES.CNG]: LOGISTICS_VEHICLE.CAPACITIES.CNG,
    [LOGISTICS_VEHICLE.TYPES.SHIP]: LOGISTICS_VEHICLE.CAPACITIES.SHIP,
    [LOGISTICS_VEHICLE.TYPES.PLANE]: LOGISTICS_VEHICLE.CAPACITIES.PLANE,
  };
  return capacities[type] || LOGISTICS_VEHICLE.CAPACITIES.VAN;
}

export function logisticsVehicleIsAvailable(status: LogisticsVehicleStatus): boolean {
  const availableStatuses: LogisticsVehicleStatus[] = [
    LOGISTICS_VEHICLE.STATUS.AVAILABLE,
    LOGISTICS_VEHICLE.STATUS.ACTIVE,
    LOGISTICS_VEHICLE.STATUS.ON_DUTY,
  ];
  return availableStatuses.includes(status);
}

export function logisticsVehicleIsOperational(status: LogisticsVehicleStatus): boolean {
  const operationalStatuses: LogisticsVehicleStatus[] = [
    LOGISTICS_VEHICLE.STATUS.AVAILABLE,
    LOGISTICS_VEHICLE.STATUS.ACTIVE,
    LOGISTICS_VEHICLE.STATUS.ON_DUTY,
    LOGISTICS_VEHICLE.STATUS.REFUELING,
  ];
  return operationalStatuses.includes(status);
}

export function logisticsVehicleIsUnderMaintenance(status: LogisticsVehicleStatus): boolean {
  const maintenanceStatuses: LogisticsVehicleStatus[] = [
    LOGISTICS_VEHICLE.STATUS.MAINTENANCE,
    LOGISTICS_VEHICLE.STATUS.REPAIR,
  ];
  return maintenanceStatuses.includes(status);
}
