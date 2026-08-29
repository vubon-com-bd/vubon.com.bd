/**
 * Delivery Time Slot Types
 * Type definitions for logistics delivery time slots based on shared-constants
 * @module DeliveryTimeSlotTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics delivery
// ============================================================
import {
  // Delivery Time Slot Constants
  LOGISTICS_DELIVERY_TIME_SLOT,
  LogisticsDeliveryTimeSlotType,
  LogisticsDeliveryTimeSlotLabel,
  LogisticsDeliveryTimeSlotColor,
  LogisticsDeliveryTimeSlotIcon,
  logisticsDeliveryTimeSlotGetLabel,
  logisticsDeliveryTimeSlotGetHours,
  logisticsDeliveryTimeSlotGetPriority,
  logisticsDeliveryTimeSlotGetColor,
  logisticsDeliveryTimeSlotGetIcon,
  logisticsDeliveryTimeSlotIsWeekend,
  logisticsDeliveryTimeSlotGetHoursForDay,
} from '@vubon/shared-constants';

// ============================================================
// Delivery Time Slot Extended Types
// ============================================================

/**
 * Delivery time slot
 */
export interface DeliveryTimeSlot extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsDeliveryTimeSlotType;
  label: LogisticsDeliveryTimeSlotLabel;
  hours: string;
  priority: number;
  color: LogisticsDeliveryTimeSlotColor;
  icon: LogisticsDeliveryTimeSlotIcon;
  isWeekend: boolean;
  isActive: boolean;
  capacity: number;
  bookedCount: number;
  availableCount: number;
  metadata?: Metadata;
}

/**
 * Delivery time slot filter
 */
export interface DeliveryTimeSlotFilter {
  ids?: ID[];
  types?: LogisticsDeliveryTimeSlotType[];
  labels?: LogisticsDeliveryTimeSlotLabel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isWeekend?: boolean;
  isActive?: boolean;
  minPriority?: number;
  maxPriority?: number;
  minCapacity?: number;
  maxCapacity?: number;
  searchTerm?: string;
}

/**
 * Delivery time slot statistics
 */
export interface DeliveryTimeSlotStatistics {
  totalTimeSlots: number;
  activeTimeSlots: number;
  weekendTimeSlots: number;
  byType: Record<LogisticsDeliveryTimeSlotType, number>;
  byPriority: Record<number, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalCapacity: number;
  totalBooked: number;
  totalAvailable: number;
  utilizationRate: number;
  mostBookedTimeSlot: LogisticsDeliveryTimeSlotType;
  leastBookedTimeSlot: LogisticsDeliveryTimeSlotType;
}

/**
 * Delivery time slot summary
 */
export interface DeliveryTimeSlotSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTimeSlots: number;
  active: number;
  weekend: number;
  byType: Record<LogisticsDeliveryTimeSlotType, number>;
  byPriority: Record<number, number>;
  slotTrend: {
    date: Date;
    total: number;
    booked: number;
    available: number;
  }[];
  topTypes: {
    type: LogisticsDeliveryTimeSlotType;
    count: number;
    label: string;
  }[];
  capacitySummary: {
    total: number;
    booked: number;
    available: number;
    utilization: number;
  };
}

/**
 * Delivery time slot configuration
 */
export interface DeliveryTimeSlotConfiguration {
  enabled: boolean;
  defaultTimeSlot: LogisticsDeliveryTimeSlotType;
  allowWeekend: boolean;
  maxBookingsPerSlot: number;
  bookingCutoffMinutes: number;
  slotDurationMinutes: number;
  notificationOnBook: boolean;
  notificationOnCancel: boolean;
  notificationOnReminder: boolean;
  alertConfig?: DeliveryTimeSlotAlertConfig;
}

/**
 * Delivery time slot alert configuration
 */
export interface DeliveryTimeSlotAlertConfig {
  enabled: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  overbookingAlert: boolean;
  schedulingConflictAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Delivery time slot history
 */
export interface DeliveryTimeSlotHistory extends BaseEntity, Timestamp {
  id: ID;
  timeSlotId: ID;
  action: 'create' | 'update' | 'book' | 'cancel' | 'complete' | 'activate' | 'deactivate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Delivery time slot validation
 */
export interface DeliveryTimeSlotValidation {
  isValid: boolean;
  timeSlotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Delivery time slot export
 */
export interface DeliveryTimeSlotExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DeliveryTimeSlotFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Delivery Time Slot Constants
  LOGISTICS_DELIVERY_TIME_SLOT,
  LogisticsDeliveryTimeSlotType,
  LogisticsDeliveryTimeSlotLabel,
  LogisticsDeliveryTimeSlotColor,
  LogisticsDeliveryTimeSlotIcon,
  logisticsDeliveryTimeSlotGetLabel,
  logisticsDeliveryTimeSlotGetHours,
  logisticsDeliveryTimeSlotGetPriority,
  logisticsDeliveryTimeSlotGetColor,
  logisticsDeliveryTimeSlotGetIcon,
  logisticsDeliveryTimeSlotIsWeekend,
  logisticsDeliveryTimeSlotGetHoursForDay,
};
