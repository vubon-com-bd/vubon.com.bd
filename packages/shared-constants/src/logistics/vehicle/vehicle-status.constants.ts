/**
 * Vehicle Status Constants
 * Status definitions for vehicles
 */

export const LOGISTICS_VEHICLE_STATUS = {
  // Status Types
  TYPES: {
    AVAILABLE: 'available',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    REPAIR: 'repair',
    REFUELING: 'refueling',
    OFF_DUTY: 'off_duty',
    ON_DUTY: 'on_duty',
  } as const,

  // Status Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    UNAVAILABLE: 'unavailable',
    MAINTENANCE: 'maintenance',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    AVAILABLE: '#green-500',
    ACTIVE: '#blue-500',
    INACTIVE: '#gray-400',
    MAINTENANCE: '#orange-500',
    REPAIR: '#red-500',
    REFUELING: '#yellow-500',
    OFF_DUTY: '#gray-500',
    ON_DUTY: '#green-400',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    AVAILABLE: '🟢',
    ACTIVE: '🔵',
    INACTIVE: '⚪',
    MAINTENANCE: '🟠',
    REPAIR: '🔴',
    REFUELING: '🟡',
    OFF_DUTY: '⚫',
    ON_DUTY: '🟩',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    AVAILABLE_TO_ACTIVE: 'available_to_active',
    AVAILABLE_TO_MAINTENANCE: 'available_to_maintenance',
    ACTIVE_TO_AVAILABLE: 'active_to_available',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_MAINTENANCE: 'active_to_maintenance',
    MAINTENANCE_TO_AVAILABLE: 'maintenance_to_available',
    MAINTENANCE_TO_REPAIR: 'maintenance_to_repair',
    REPAIR_TO_AVAILABLE: 'repair_to_available',
    AVAILABLE_TO_REFUELING: 'available_to_refueling',
    REFUELING_TO_AVAILABLE: 'refueling_to_available',
    ACTIVE_TO_OFF_DUTY: 'active_to_off_duty',
    OFF_DUTY_TO_ACTIVE: 'off_duty_to_active',
    INACTIVE_TO_AVAILABLE: 'inactive_to_available',
    ANY_TO_OFF_DUTY: 'any_to_off_duty',
  } as const,
} as const;

// Status Types
export type LogisticsVehicleStatusType =
  (typeof LOGISTICS_VEHICLE_STATUS.TYPES)[keyof typeof LOGISTICS_VEHICLE_STATUS.TYPES];

// Status Categories
export type LogisticsVehicleStatusCategory =
  (typeof LOGISTICS_VEHICLE_STATUS.CATEGORIES)[keyof typeof LOGISTICS_VEHICLE_STATUS.CATEGORIES];

// Status Colors
export type LogisticsVehicleStatusColor =
  (typeof LOGISTICS_VEHICLE_STATUS.COLORS)[keyof typeof LOGISTICS_VEHICLE_STATUS.COLORS];

// Status Icons
export type LogisticsVehicleStatusIcon =
  (typeof LOGISTICS_VEHICLE_STATUS.ICONS)[keyof typeof LOGISTICS_VEHICLE_STATUS.ICONS];

// Status Transitions
export type LogisticsVehicleStatusTransition =
  (typeof LOGISTICS_VEHICLE_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_VEHICLE_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsVehicleStatusGetLabel(status: LogisticsVehicleStatusType): string {
  const labels: Record<LogisticsVehicleStatusType, string> = {
    [LOGISTICS_VEHICLE_STATUS.TYPES.AVAILABLE]: 'Available',
    [LOGISTICS_VEHICLE_STATUS.TYPES.ACTIVE]: 'Active',
    [LOGISTICS_VEHICLE_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LOGISTICS_VEHICLE_STATUS.TYPES.MAINTENANCE]: 'Under Maintenance',
    [LOGISTICS_VEHICLE_STATUS.TYPES.REPAIR]: 'In Repair',
    [LOGISTICS_VEHICLE_STATUS.TYPES.REFUELING]: 'Refueling',
    [LOGISTICS_VEHICLE_STATUS.TYPES.OFF_DUTY]: 'Off Duty',
    [LOGISTICS_VEHICLE_STATUS.TYPES.ON_DUTY]: 'On Duty',
  };
  return labels[status] || 'Unknown';
}

export function logisticsVehicleStatusGetCategory(
  status: LogisticsVehicleStatusType
): LogisticsVehicleStatusCategory {
  const categories: Record<LogisticsVehicleStatusType, LogisticsVehicleStatusCategory> = {
    [LOGISTICS_VEHICLE_STATUS.TYPES.AVAILABLE]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_VEHICLE_STATUS.TYPES.ACTIVE]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_VEHICLE_STATUS.TYPES.ON_DUTY]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_VEHICLE_STATUS.TYPES.REFUELING]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.OPERATIONAL,
    [LOGISTICS_VEHICLE_STATUS.TYPES.INACTIVE]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_VEHICLE_STATUS.TYPES.OFF_DUTY]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.UNAVAILABLE,
    [LOGISTICS_VEHICLE_STATUS.TYPES.MAINTENANCE]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.MAINTENANCE,
    [LOGISTICS_VEHICLE_STATUS.TYPES.REPAIR]: LOGISTICS_VEHICLE_STATUS.CATEGORIES.MAINTENANCE,
  };
  return categories[status] || LOGISTICS_VEHICLE_STATUS.CATEGORIES.UNAVAILABLE;
}

export function logisticsVehicleStatusIsAvailable(status: LogisticsVehicleStatusType): boolean {
  return (
    status === LOGISTICS_VEHICLE_STATUS.TYPES.AVAILABLE ||
    status === LOGISTICS_VEHICLE_STATUS.TYPES.ACTIVE ||
    status === LOGISTICS_VEHICLE_STATUS.TYPES.ON_DUTY
  );
}

export function logisticsVehicleStatusIsOperational(status: LogisticsVehicleStatusType): boolean {
  const operationalStatuses: LogisticsVehicleStatusType[] = [
    LOGISTICS_VEHICLE_STATUS.TYPES.AVAILABLE,
    LOGISTICS_VEHICLE_STATUS.TYPES.ACTIVE,
    LOGISTICS_VEHICLE_STATUS.TYPES.ON_DUTY,
    LOGISTICS_VEHICLE_STATUS.TYPES.REFUELING,
  ];
  return operationalStatuses.includes(status);
}

export function logisticsVehicleStatusIsUnderMaintenance(
  status: LogisticsVehicleStatusType
): boolean {
  return (
    status === LOGISTICS_VEHICLE_STATUS.TYPES.MAINTENANCE ||
    status === LOGISTICS_VEHICLE_STATUS.TYPES.REPAIR
  );
}

export function logisticsVehicleStatusCanTransition(
  status: LogisticsVehicleStatusType,
  transition: LogisticsVehicleStatusTransition
): boolean {
  const allowedTransitions: Record<LogisticsVehicleStatusType, LogisticsVehicleStatusTransition[]> =
    {
      [LOGISTICS_VEHICLE_STATUS.TYPES.AVAILABLE]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.AVAILABLE_TO_ACTIVE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.AVAILABLE_TO_MAINTENANCE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.AVAILABLE_TO_REFUELING,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ANY_TO_OFF_DUTY,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.ACTIVE]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_AVAILABLE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_MAINTENANCE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_OFF_DUTY,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.MAINTENANCE]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.MAINTENANCE_TO_AVAILABLE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.MAINTENANCE_TO_REPAIR,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.REPAIR]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.REPAIR_TO_AVAILABLE,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.REFUELING]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.REFUELING_TO_AVAILABLE,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.INACTIVE]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.INACTIVE_TO_AVAILABLE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ANY_TO_OFF_DUTY,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.OFF_DUTY]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.OFF_DUTY_TO_ACTIVE,
      ],
      [LOGISTICS_VEHICLE_STATUS.TYPES.ON_DUTY]: [
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_AVAILABLE,
        LOGISTICS_VEHICLE_STATUS.TRANSITIONS.ACTIVE_TO_OFF_DUTY,
      ],
    };
  return allowedTransitions[status]?.includes(transition) || false;
}
