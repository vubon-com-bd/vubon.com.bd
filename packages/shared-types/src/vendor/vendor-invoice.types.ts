/**
 * Vendor Invoice Types
 * Type definitions for vendor invoices based on shared-constants
 * @module VendorInvoiceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor invoice
// ============================================================
import {
  // Vendor Invoice
  VENDOR_INVOICE,
  VendorInvoiceType,
  VendorInvoiceStatus,
  VendorInvoicePaymentMethod,
  VendorInvoiceCurrency,
  VendorInvoicePeriod,
  VendorInvoicePaymentTerm,
  vendorInvoiceGetTypeLabel,
  vendorInvoiceGetStatusLabel,
  vendorInvoiceGetPaymentMethodLabel,
  vendorInvoiceGetCurrencyLabel,
  vendorInvoiceGetPeriodLabel,
  vendorInvoiceGetPaymentTermLabel,
  vendorInvoiceIsPaid,
  vendorInvoiceIsPending,
  vendorInvoiceIsOverdue,
  // Vendor Invoice Status
  VENDOR_INVOICE_STATUS,
  VendorInvoiceStatusType,
  VendorInvoiceStatusCategory,
  VendorInvoiceStatusColor,
  VendorInvoiceStatusIcon,
  VendorInvoiceStatusTransition,
  vendorInvoiceStatusGetLabel,
  vendorInvoiceStatusIsPaid,
  vendorInvoiceStatusIsPending,
  vendorInvoiceStatusIsOverdue,
  vendorInvoiceStatusIsDraft,
  vendorInvoiceStatusGetCategory,
  vendorInvoiceStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Invoice Extended Types
// ============================================================

/**
 * Vendor invoice item
 */
export interface VendorInvoiceItem extends BaseEntity, Timestamp {
  id: ID;
  invoiceId: ID;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  currency: Currency;
  metadata?: Metadata;
}

/**
 * Vendor invoice
 */
export interface VendorInvoice extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  invoiceNumber: string;
  type: VendorInvoiceType;
  status: VendorInvoiceStatusType;
  paymentMethod: VendorInvoicePaymentMethod;
  currency: VendorInvoiceCurrency;
  period: VendorInvoicePeriod;
  paymentTerm: VendorInvoicePaymentTerm;
  items: VendorInvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  isPaid: boolean;
  isPending: boolean;
  isOverdue: boolean;
  isDraft: boolean;
  issuedAt: Date;
  dueDate: Date;
  paidAt?: Date;
  metadata?: Metadata;
}

/**
 * Vendor invoice filter
 */
export interface VendorInvoiceFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorInvoiceType[];
  statuses?: VendorInvoiceStatusType[];
  paymentMethods?: VendorInvoicePaymentMethod[];
  currencies?: VendorInvoiceCurrency[];
  periods?: VendorInvoicePeriod[];
  paymentTerms?: VendorInvoicePaymentTerm[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPaid?: boolean;
  isPending?: boolean;
  isOverdue?: boolean;
  isDraft?: boolean;
  minTotal?: number;
  maxTotal?: number;
  searchTerm?: string;
  invoiceNumber?: string;
}

/**
 * Vendor invoice statistics
 */
export interface VendorInvoiceStatistics {
  vendorId: ID;
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
  draftInvoices: number;
  byType: Record<VendorInvoiceType, number>;
  byStatus: Record<VendorInvoiceStatusType, number>;
  byPaymentMethod: Record<VendorInvoicePaymentMethod, number>;
  byCurrency: Record<VendorInvoiceCurrency, number>;
  byPeriod: Record<VendorInvoicePeriod, number>;
  byPaymentTerm: Record<VendorInvoicePaymentTerm, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalPaidAmount: number;
  totalPendingAmount: number;
  totalOverdueAmount: number;
  mostFrequentType: VendorInvoiceType;
  mostFrequentStatus: VendorInvoiceStatusType;
  mostFrequentPaymentMethod: VendorInvoicePaymentMethod;
  mostFrequentCurrency: VendorInvoiceCurrency;
}

/**
 * Vendor invoice summary
 */
export interface VendorInvoiceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInvoices: number;
  paid: number;
  pending: number;
  overdue: number;
  draft: number;
  byType: Record<VendorInvoiceType, number>;
  byStatus: Record<VendorInvoiceStatusType, number>;
  byPaymentMethod: Record<VendorInvoicePaymentMethod, number>;
  byCurrency: Record<VendorInvoiceCurrency, number>;
  byPeriod: Record<VendorInvoicePeriod, number>;
  byPaymentTerm: Record<VendorInvoicePaymentTerm, number>;
  invoiceTrend: {
    date: Date;
    total: number;
    paid: number;
    overdue: number;
  }[];
  topTypes: {
    type: VendorInvoiceType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorInvoiceStatusType;
    count: number;
    label: string;
  }[];
  topPaymentMethods: {
    method: VendorInvoicePaymentMethod;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: VendorInvoiceCurrency;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalPaidAmount: number;
    totalPendingAmount: number;
    totalOverdueAmount: number;
  };
}

/**
 * Vendor invoice configuration
 */
export interface VendorInvoiceConfiguration {
  enabled: boolean;
  defaultType: VendorInvoiceType;
  defaultPaymentMethod: VendorInvoicePaymentMethod;
  defaultCurrency: VendorInvoiceCurrency;
  defaultPeriod: VendorInvoicePeriod;
  defaultPaymentTerm: VendorInvoicePaymentTerm;
  requireItems: boolean;
  requireDescription: boolean;
  requireQuantity: boolean;
  requireUnitPrice: boolean;
  taxRate: number;
  autoGenerateNumber: boolean;
  invoiceNumberPrefix: string;
  invoiceNumberLength: number;
  dueDateOffsetDays: number;
  allowPartialPayment: boolean;
  allowDiscount: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPaid: boolean;
  notificationOnOverdue: boolean;
  alertConfig?: VendorInvoiceAlertConfig;
}

/**
 * Vendor invoice alert configuration
 */
export interface VendorInvoiceAlertConfig {
  enabled: boolean;
  overdueAlert: boolean;
  overdueThresholdDays: number;
  pendingPaymentAlert: boolean;
  pendingPaymentThresholdDays: number;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor invoice history
 */
export interface VendorInvoiceHistory extends BaseEntity, Timestamp {
  id: ID;
  invoiceId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'issue' | 'pay' | 'cancel' | 'overdue' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor invoice validation
 */
export interface VendorInvoiceValidation {
  isValid: boolean;
  invoiceId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor invoice export
 */
export interface VendorInvoiceExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorInvoiceFilter;
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
  // Vendor Invoice
  VENDOR_INVOICE,
  VendorInvoiceType,
  VendorInvoiceStatus,
  VendorInvoicePaymentMethod,
  VendorInvoiceCurrency,
  VendorInvoicePeriod,
  VendorInvoicePaymentTerm,
  vendorInvoiceGetTypeLabel,
  vendorInvoiceGetStatusLabel,
  vendorInvoiceGetPaymentMethodLabel,
  vendorInvoiceGetCurrencyLabel,
  vendorInvoiceGetPeriodLabel,
  vendorInvoiceGetPaymentTermLabel,
  vendorInvoiceIsPaid,
  vendorInvoiceIsPending,
  vendorInvoiceIsOverdue,
  // Vendor Invoice Status
  VENDOR_INVOICE_STATUS,
  VendorInvoiceStatusType,
  VendorInvoiceStatusCategory,
  VendorInvoiceStatusColor,
  VendorInvoiceStatusIcon,
  VendorInvoiceStatusTransition,
  vendorInvoiceStatusGetLabel,
  vendorInvoiceStatusIsPaid,
  vendorInvoiceStatusIsPending,
  vendorInvoiceStatusIsOverdue,
  vendorInvoiceStatusIsDraft,
  vendorInvoiceStatusGetCategory,
  vendorInvoiceStatusCanTransition,
};
