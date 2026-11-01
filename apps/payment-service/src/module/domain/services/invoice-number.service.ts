/**
 * InvoiceNumberService — sequential, year-based invoice numbering
 * @module payment-service/domain/services
 *
 * Format: INV-YYYY-NNNNNN (6-digit sequential, zero-padded)
 * Sequence resets per year.
 *
 * Uses Redis INCR for atomic sequencing.
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

export const INVOICE_NUMBER_SERVICE = Symbol('INVOICE_NUMBER_SERVICE');
const COUNTER_PREFIX = 'invoice-seq:';

@Injectable()
export class InvoiceNumberService {
  private readonly logger = new Logger(InvoiceNumberService.name);

  constructor(private readonly redis: RedisService) {}

  /**
   * Generate sequential invoice number for the current year.
   * Example: INV-2026-000123
   */
  async generate(referenceDate: Date = new Date()): Promise<string> {
    const year = referenceDate.getFullYear();
    const counterKey = `${COUNTER_PREFIX}${year}`;

    try {
      const seq = await this.redis.raw.incr(counterKey);
      const padded = seq.toString().padStart(6, '0');
      return `INV-${year}-${padded}`;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Sequential invoice number failed, using fallback: ${msg}`);
      // Fallback: timestamp-based
      const seq = Date.now() % 1000000;
      return `INV-${year}-${seq.toString().padStart(6, '0')}`;
    }
  }

  /**
   * Peek current counter (no increment)
   */
  async currentSequence(referenceDate: Date = new Date()): Promise<number> {
    const year = referenceDate.getFullYear();
    const value = await this.redis.raw.get(`${COUNTER_PREFIX}${year}`);
    return value ? parseInt(value, 10) : 0;
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
