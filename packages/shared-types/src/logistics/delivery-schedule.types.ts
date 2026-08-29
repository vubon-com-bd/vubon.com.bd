/**
 * Delivery Schedule Types
 * Type definitions for logistics delivery schedules based on shared-constants
 * @module DeliveryScheduleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics delivery
// ============================================================
import {
  // Delivery Constants
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
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
// Delivery Schedule Extended Types
// ============================================================

/**
 * Delivery schedule
 */
export interface DeliverySchedule extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  orderId: ID;
  userId: ID;
  timeSlot: LogisticsDeliveryTimeSlotType;
  scheduledDate: Date;
  scheduledTime: string;
  actualDate?: Date;
  actualTime?: string;
  isWeekend: boolean;
  isHoliday: boolean;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  metadata?: Metadata;
}

/**
 * Delivery schedule filter
 */
export interface DeliveryScheduleFilter {
  ids?: ID[];
  deliveryIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  timeSlots?: LogisticsDeliveryTimeSlotType[];
  statuses?: ('scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'failed' | 'cancelled')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isWeekend?: boolean;
  isHoliday?: boolean;
  searchTerm?: string;
}

/**
 * Delivery schedule statistics
 */
export interface DeliveryScheduleStatistics {
  deliveryId: ID;
  totalSchedules: number;
  scheduled: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  failed: number;
  cancelled: number;
  byTimeSlot: Record<LogisticsDeliveryTimeSlotType, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  weekendSchedules: number;
  holidaySchedules: number;
  completionRate: number;
  failureRate: number;
  mostFrequentTimeSlot: LogisticsDeliveryTimeSlotType;
  mostFrequentStatus: string;
}

/**
 * Delivery schedule summary
 */
export interface DeliveryScheduleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchedules: number;
  scheduled: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  failed: number;
  cancelled: number;
  byTimeSlot: Record<LogisticsDeliveryTimeSlotType, number>;
  byStatus: Record<string, number>;
  scheduleTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTimeSlots: {
    timeSlot: LogisticsDeliveryTimeSlotType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    completionRate: number;
    failureRate: number;
    onTimeRate: number;
  };
}

/**
 * Delivery schedule configuration
 */
export interface DeliveryScheduleConfiguration {
  enabled: boolean;
  defaultTimeSlot: LogisticsDeliveryTimeSlotType;
  allowWeekendDelivery: boolean;
  allowHolidayDelivery: boolean;
  requireConfirmation: boolean;
  confirmationTimeoutHours: number;
  maxSchedulesPerDay: number;
  maxSchedulesPerTimeSlot: number;
  notificationOnSchedule: boolean;
  notificationOnConfirm: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: DeliveryScheduleAlertConfig;
}

/**
 * Delivery schedule alert configuration
 */
export interface DeliveryScheduleAlertConfig {
  enabled: boolean;
  scheduleDelayAlert: boolean;
  scheduleDelayThreshold: number;
  failureAlert: boolean;
  capacityAlert: boolean;
  capacityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Delivery schedule history
 */
export interface DeliveryScheduleHistory extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  deliveryId: ID;
  action: 'schedule' | 'confirm' | 'start' | 'complete' | 'fail' | 'cancel' | 'reschedule';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Delivery schedule validation
 */
export interface DeliveryScheduleValidation {
  isValid: boolean;
  scheduleId: ID;
  deliveryId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Delivery schedule export
 */
export interface DeliveryScheduleExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DeliveryScheduleFilter;
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
  // Delivery Constants
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
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
