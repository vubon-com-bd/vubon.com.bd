/**
 * ShipmentNumberService — Domain Service
 * @module logistics-service/domain/services
 *
 * Generates shipment numbers + tracking numbers.
 * Business Rules:
 *   - Format: SH + 14 chars (digits/uppercase) = 16 chars total
 *   - Collision detection via provided `existsFn` callback
 *   - Deterministic per-second timestamps + random suffix for uniqueness
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { ShipmentNumberVO } from '../value-objects/primitives/shipment-number.vo.js';

const PREFIX = SHIPMENT.TRACKING_NUMBER_PREFIX; // 'SH'
const TOTAL_LENGTH = SHIPMENT.TRACKING_NUMBER_LENGTH; // 16
const BODY_LENGTH = TOTAL_LENGTH - PREFIX.length; // 14
const MAX_GENERATION_ATTEMPTS = 5;

export interface ShipmentNumberGenerateInput {
  /** Optional timestamp source — for testing */
  readonly now?: Date;
  /** Optional random seed — for testing */
  readonly randomSeed?: string;
}

export class ShipmentNumberService {
  /**
   * Generate a unique shipment number.
   * @param existsFn — collision check callback (async)
   * @param input — optional test override
   */
  static async generate(
    existsFn: (candidate: string) => Promise<boolean>,
    input?: ShipmentNumberGenerateInput,
  ): Promise<ShipmentNumberVO> {
    for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
      const candidate = this.buildCandidate(input);
      const exists = await existsFn(candidate);
      if (!exists) {
        return ShipmentNumberVO.create(candidate);
      }
    }
    throw new BusinessRuleError(
      `Failed to generate unique shipment number after ${MAX_GENERATION_ATTEMPTS} attempts`,
      'SHIPMENT_NUMBER_GENERATION_FAILED',
      { maxAttempts: MAX_GENERATION_ATTEMPTS },
    );
  }

  /**
   * Generate a unique tracking number (alias of shipment number for now).
   * Tracking numbers and shipment numbers currently share the same format.
   */
  static async generateTracking(
    existsFn: (candidate: string) => Promise<boolean>,
    input?: ShipmentNumberGenerateInput,
  ): Promise<string> {
    const vo = await this.generate(existsFn, input);
    return vo.value;
  }

  /**
   * Build a candidate string. Format: SH + YYYYMMDDHHmmss + 2 random chars = 16 chars.
   * Time portion: 14 digits (YYYYMMDDHHmmss).
   * Random portion: 2 chars → total = 16 chars ✓
   */
  private static buildCandidate(input?: ShipmentNumberGenerateInput): string {
    const now = input?.now ?? new Date();
    const randomSeed = input?.randomSeed ?? this.randomSuffix(2);

    const yyyy = now.getUTCFullYear().toString();
    const mm = this.pad(now.getUTCMonth() + 1, 2);
    const dd = this.pad(now.getUTCDate(), 2);
    const hh = this.pad(now.getUTCHours(), 2);
    const mi = this.pad(now.getUTCMinutes(), 2);
    const ss = this.pad(now.getUTCSeconds(), 2);
    const timePart = `${yyyy}${mm}${dd}${hh}${mi}${ss}`; // 14 digits

    const suffix = randomSeed.toUpperCase().slice(0, BODY_LENGTH - timePart.length || 2);
    const body = `${timePart}${suffix}`.slice(0, BODY_LENGTH);

    return `${PREFIX}${body}`;
  }

  private static pad(n: number, width: number): string {
    return n.toString().padStart(width, '0');
  }

  private static randomSuffix(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let out = '';
    for (let i = 0; i < length; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return out;
  }

  /**
   * Validate an existing shipment number (format check only).
   */
  static isValid(shipmentNumber: string): boolean {
    try {
      ShipmentNumberVO.create(shipmentNumber);
      return true;
    } catch {
      return false;
    }
  }
}
