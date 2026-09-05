/**
 * Report Generator
 * রিপোর্ট জেনারেটর
 */

import { formatDate, formatCurrency } from '../../common/formatter';
import { CURRENCY } from '@vubon/shared-constants';
import type { FlashSaleReport } from '@vubon/shared-types';
import type { Currency } from '@vubon/shared-constants';

export interface ReportGenerationResult {
  report: FlashSaleReport;
  summary: {
    totalRevenue: string;
    totalOrders: string;
    totalDiscount: string;
    averageDiscount: string;
    conversionRate: string;
    sellThroughRate: string;
  };
  generatedAt: string;
}

export const generateReport = (
  report: FlashSaleReport,
  currency: Currency = CURRENCY.BDT
): ReportGenerationResult => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const summary = {
    totalRevenue: formatPrice(report.totalRevenue),
    totalOrders: report.totalOrders.toString(),
    totalDiscount: formatPrice(report.totalDiscount),
    averageDiscount: `${report.averageDiscount}%`,
    conversionRate: `${report.conversionRate}%`,
    sellThroughRate: `${report.sellThroughRate}%`,
  };

  return {
    report,
    summary,
    generatedAt: formatDate(new Date(), 'DD-MM-YYYY HH:mm:ss'),
  };
};

export const generateFlashSaleCSV = (report: FlashSaleReport): string => {
  const headers = ['Product ID', 'Product Name', 'Quantity Sold', 'Revenue', 'Discount'];

  const rows = report.topProducts.map((p) => [
    p.productId,
    p.productName,
    p.quantitySold.toString(),
    p.revenue.toString(),
    p.discount.toString(),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  return csvContent;
};

export const generateFlashSalePDF = (report: FlashSaleReport): string => {
  // In real implementation, this would generate a PDF
  return `Report: ${report.name}\nGenerated: ${new Date().toISOString()}\nTotal Revenue: ${report.totalRevenue}\nTotal Orders: ${report.totalOrders}`;
};
