/**
 * CourierTrackingUrlService — build public tracking URL from a template
 * @module logistics-service/domain/services
 *
 * Templates support {trackingNumber} and {courierCode} placeholders.
 * Example: 'https://pathao.com/track/{trackingNumber}'
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { CourierEntity } from '../entities/courier.entity.js';

export class CourierTrackingUrlService {
  /**
   * Build a tracking URL by substituting placeholders in the courier's
   * trackingUrlTemplate. Returns null if the courier has no template.
   */
  static build(courier: CourierEntity, trackingNumber: string): string | null {
    if (!trackingNumber || trackingNumber.trim().length === 0) {
      throw new ValidationError('Tracking number required', 'trackingNumber');
    }
    const template = courier.trackingUrlTemplate;
    if (!template) return null;
    return template
      .replace(/\{trackingNumber\}/g, encodeURIComponent(trackingNumber))
      .replace(/\{courierCode\}/g, encodeURIComponent(courier.code.value));
  }

  /** Throws if no template is configured. */
  static buildOrThrow(courier: CourierEntity, trackingNumber: string): string {
    const url = this.build(courier, trackingNumber);
    if (!url) {
      throw new ValidationError(
        `Courier "${courier.code.value}" has no tracking URL template`,
        'courier',
      );
    }
    return url;
  }

  /** Extract placeholder keys from a template (useful for validation). */
  static extractPlaceholders(template: string): readonly string[] {
    const matches = template.match(/\{([a-zA-Z][a-zA-Z0-9]*)\}/g) ?? [];
    return matches.map((m) => m.slice(1, -1));
  }
}
