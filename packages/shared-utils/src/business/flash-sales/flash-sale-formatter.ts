/**
 * Flash Sale Formatter
 * ফ্ল্যাশ সেল ফরম্যাটার
 */

import { formatDate, formatCurrency } from '../../common/formatter';
import { CURRENCY } from '@vubon/shared-constants';
import type { FlashSale } from '@vubon/shared-types';
import type { Currency } from '@vubon/shared-constants';

export interface FormattedFlashSale {
  id: string;
  name: string;
  nameBangla?: string;
  status: string;
  statusLabel: string;
  type: string;
  typeLabel: string;
  startDate: string;
  endDate: string;
  totalProducts: number;
  totalParticipants: number;
  totalOrders: number;
  totalRevenue: string;
  maxDiscount: number;
  minDiscount: number;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  };
  progress: number;
}

export const formatFlashSale = (
  flashSale: FlashSale,
  currency: Currency = CURRENCY.BDT
): FormattedFlashSale => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const now = new Date();
  const endDate = new Date(flashSale.endDate);
  const startDate = new Date(flashSale.startDate);

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const progress = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;

  const diff = endDate.getTime() - now.getTime();
  const isExpired = diff <= 0;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return {
    id: flashSale.id,
    name: flashSale.name,
    nameBangla: flashSale.nameBangla,
    status: flashSale.status,
    statusLabel: getFlashSaleStatusLabel(flashSale.status),
    type: flashSale.type,
    typeLabel: getFlashSaleTypeLabel(flashSale.type),
    startDate: formatDate(flashSale.startDate, 'DD-MM-YYYY HH:mm'),
    endDate: formatDate(flashSale.endDate, 'DD-MM-YYYY HH:mm'),
    totalProducts: flashSale.totalProducts || 0,
    totalParticipants: flashSale.totalParticipants || 0,
    totalOrders: flashSale.totalOrders || 0,
    totalRevenue: formatPrice(flashSale.totalRevenue || 0),
    maxDiscount: flashSale.maxDiscount || 0,
    minDiscount: flashSale.minDiscount || 0,
    timeRemaining: {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
      isExpired,
    },
    progress: Math.min(100, Math.max(0, Math.round(progress * 100) / 100)),
  };
};

export const getFlashSaleStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    draft: 'Draft',
    scheduled: 'Scheduled',
    active: 'Active',
    paused: 'Paused',
    ended: 'Ended',
    cancelled: 'Cancelled',
    archived: 'Archived',
    deleted: 'Deleted',
    preparing: 'Preparing',
    approved: 'Approved',
    rejected: 'Rejected',
    pending_approval: 'Pending Approval',
  };

  return labels[status] || status;
};

export const getFlashSaleTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    regular: 'Regular',
    limited: 'Limited',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    holiday: 'Holiday',
    seasonal: 'Seasonal',
    flash: 'Flash',
    mega: 'Mega',
    express: 'Express',
    super: 'Super',
    ultimate: 'Ultimate',
    warehouse: 'Warehouse',
    clearance: 'Clearance',
  };

  return labels[type] || type;
};

export const formatFlashSaleSummary = (
  flashSale: FlashSale,
  currency: Currency = CURRENCY.BDT
): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return `${flashSale.name} - ${flashSale.totalProducts} products - Revenue: ${formatPrice(flashSale.totalRevenue || 0)}`;
};
