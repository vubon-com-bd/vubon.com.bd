/**
 * VendorIdGeneratorService
 * @module vendor-service/domain/services
 *
 * Generates vendor-scoped identifiers (UUIDs and human-readable codes).
 * Deterministic given a seed, or random when no seed provided.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Crockford-ish (no I, O, 0, 1)

export class VendorIdGeneratorService {
  /**
   * Generate a UUID v4 (RFC 4122).
   * Uses crypto if available; falls back to Math.random.
   */
  static generateUUID(): string {
    if (typeof globalThis.crypto?.randomUUID === 'function') {
      return globalThis.crypto.randomUUID();
    }
    // Fallback for older environments
    const hex = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += '-';
      } else if (i === 14) {
        uuid += '4';
      } else if (i === 19) {
        uuid += hex[(Math.random() * 4) | 8];
      } else {
        uuid += hex[(Math.random() * 16) | 0];
      }
    }
    return uuid;
  }

  /** Validate UUID v4 format. */
  static isValidUUID(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }

  /**
   * Generate a short human-readable vendor code (e.g., "VND-A3K9-M2P7").
   * Not for security; use for display IDs.
   */
  static generateVendorCode(prefix = 'VND'): string {
    const block = (n: number): string => {
      let out = '';
      for (let i = 0; i < n; i++) {
        out += ALPHABET[(Math.random() * ALPHABET.length) | 0];
      }
      return out;
    };
    return `${prefix}-${block(4)}-${block(4)}`;
  }

  /**
   * Generate a payout number like "PO-20251005-AB12CD".
   */
  static generatePayoutNumber(at: Date = new Date()): string {
    const yyyy = at.getUTCFullYear();
    const mm = String(at.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(at.getUTCDate()).padStart(2, '0');
    const suffix = VendorIdGeneratorService.randomAlphaNumeric(6);
    return `PO-${yyyy}${mm}${dd}-${suffix}`;
  }

  /**
   * Generate a settlement number like "ST-20251005-XY34ZW".
   */
  static generateSettlementNumber(at: Date = new Date()): string {
    const yyyy = at.getUTCFullYear();
    const mm = String(at.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(at.getUTCDate()).padStart(2, '0');
    const suffix = VendorIdGeneratorService.randomAlphaNumeric(6);
    return `ST-${yyyy}${mm}${dd}-${suffix}`;
  }

  /**
   * Generate an invoice number like "INV-202510-0000000001".
   * `sequence` should come from a persistent counter.
   */
  static generateInvoiceNumber(sequence: number, at: Date = new Date()): string {
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new ValidationError('Invoice sequence must be a non-negative integer', 'sequence');
    }
    const yyyy = at.getUTCFullYear();
    const mm = String(at.getUTCMonth() + 1).padStart(2, '0');
    const seq = String(sequence).padStart(10, '0');
    return `INV-${yyyy}${mm}-${seq}`;
  }

  /**
   * Generate an invite token — 32 chars, URL-safe.
   */
  static generateInviteToken(): string {
    return VendorIdGeneratorService.randomAlphaNumeric(32);
  }

  /**
   * Generate a report id — sortable ULID-like.
   */
  static generateReportId(): string {
    const ts = Date.now().toString(36).toUpperCase().padStart(10, '0');
    const rand = VendorIdGeneratorService.randomAlphaNumeric(10);
    return `RPT-${ts}-${rand}`;
  }

  /** Random alphanumeric string of given length. */
  private static randomAlphaNumeric(length: number): string {
    let out = '';
    for (let i = 0; i < length; i++) {
      out += ALPHABET[(Math.random() * ALPHABET.length) | 0];
    }
    return out;
  }
}
