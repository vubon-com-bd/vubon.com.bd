/**
 * Vendor Report Generator
 * ভেন্ডর রিপোর্ট জেনারেটর
 */

import { formatDate, formatCurrency } from '../../common/formatter';
import { VENDOR_REPORT } from '@vubon/shared-constants';
import type { VendorReport } from '@vubon/shared-types';

export interface VendorReportGenerationResult {
  report: VendorReport;
  summary: {
    title: string;
    period: string;
    totalAmount: string;
    totalItems: string;
    generatedAt: string;
  };
}

export const generateVendorReport = (
  report: VendorReport,
  currency: 'BDT' | 'USD' = 'BDT'
): VendorReportGenerationResult => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const data = report.data as Record<string, unknown>;

  // VENDOR_REPORT ব্যবহার করে টাইপ চেক
  const reportType = report.type as keyof typeof VENDOR_REPORT.TYPES;
  const isValidType = Object.keys(VENDOR_REPORT.TYPES).includes(reportType);

  return {
    report,
    summary: {
      title: isValidType ? getVendorReportTypeLabel(report.type) : report.name,
      period: `${formatDate(report.periodStart, 'DD-MM-YYYY')} - ${formatDate(report.periodEnd, 'DD-MM-YYYY')}`,
      totalAmount: formatPrice((data.totalAmount as number) || 0),
      totalItems: ((data.totalItems as number) || 0).toString(),
      generatedAt: formatDate(report.generatedAt, 'DD-MM-YYYY HH:mm:ss'),
    },
  };
};

export const generateVendorCSV = (report: VendorReport): string => {
  const data = report.data as Record<string, unknown>;
  const items = (data.items as Record<string, unknown>[]) || [];

  if (items.length === 0) {
    return 'No data available';
  }

  const headers = Object.keys(items[0]);
  const rows = items.map((item) => headers.map((header) => item[header]?.toString() || ''));

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};

export const generateVendorPDF = (report: VendorReport): string => {
  return `Report: ${report.name}\nPeriod: ${report.periodStart} - ${report.periodEnd}\nGenerated: ${new Date().toISOString()}`;
};

export const getVendorReportTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    sales: 'Sales Report',
    orders: 'Orders Report',
    products: 'Products Report',
    payments: 'Payments Report',
    revenue: 'Revenue Report',
    profit: 'Profit Report',
    customers: 'Customers Report',
    analytics: 'Analytics Report',
    performance: 'Performance Report',
    inventory: 'Inventory Report',
    tax: 'Tax Report',
    comparison: 'Comparison Report',
  };
  return labels[type] || type;
};

// VENDOR_REPORT থেকে হেল্পার ফাংশন
export const getVendorReportFormatLabel = (format: string): string => {
  const labels: Record<string, string> = {
    pdf: 'PDF',
    csv: 'CSV',
    excel: 'Excel',
    json: 'JSON',
    html: 'HTML',
  };
  return labels[format] || format;
};

export const getVendorReportStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
};
