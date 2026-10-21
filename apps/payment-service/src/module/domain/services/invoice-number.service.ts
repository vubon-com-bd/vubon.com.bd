/**
 * InvoiceNumberService
 * @module payment-service/domain/services
 *
 * Format: INV-YYYY-NNNNNN (strictly 6 numeric digits)
 * Uses crypto-safe numeric suffix.
 */
import { randomInt } from 'node:crypto';

export class InvoiceNumberService {
  /**
   * Generates a new invoice number for the given date.
   * Always returns: INV-YYYY-NNNNNN (6 numeric digits).
   */
  static generate(referenceDate: Date = new Date()): string {
    const year = referenceDate.getFullYear();
    // 6-digit numeric suffix, crypto-safe, zero-padded
    const seq = randomInt(1, 999999);
    const padded = seq.toString().padStart(6, '0');
    return `INV-${year}-${padded}`;
  }

  static isInvoiceNumber(value: string): boolean {
    return /^INV-\d{4}-\d{6}$/.test(value.trim());
  }

  static yearOf(invoiceNumber: string): number {
    return Number(invoiceNumber.split('-')[1]);
  }

  static sequenceOf(invoiceNumber: string): number {
    return Number(invoiceNumber.split('-')[2]);
  }
}
