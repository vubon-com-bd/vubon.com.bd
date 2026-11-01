/**
 * I18nService — language-aware template selection
 * @module notification-service/domain/services
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  NOTIFICATION_LOCALE,
  DEFAULT_NOTIFICATION_LOCALE,
  SUPPORTED_LOCALES,
} from '@vubon/shared-constants/platform/notification';
import { NOTIFICATION_TEMPLATES_BN } from '@vubon/shared-constants/platform/notification';

export interface ResolvedTemplate {
  readonly subject: string;
  readonly body: string;
  readonly locale: string;
}

@Injectable()
export class I18nService {
  private readonly logger = new Logger(I18nService.name);

  /**
   * Resolve template by key + locale
   */
  resolve(key: string, locale?: string): ResolvedTemplate {
    const normalizedLocale = this.normalizeLocale(locale);

    // Bangla templates
    if (normalizedLocale === NOTIFICATION_LOCALE.BN) {
      const bnTemplate = (NOTIFICATION_TEMPLATES_BN as Record<string, { subject: string; body: string }>)[key];
      if (bnTemplate) {
        return {
          subject: bnTemplate.subject,
          body: bnTemplate.body,
          locale: NOTIFICATION_LOCALE.BN,
        };
      }
      this.logger.warn(`Bangla template not found for key "${key}" — falling back to English`);
    }

    // Default: English key (used as-is by caller)
    return {
      subject: key,
      body: key,
      locale: NOTIFICATION_LOCALE.EN,
    };
  }

  /**
   * Interpolate variables into template
   */
  interpolate(template: string, variables: Record<string, unknown>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, name) => {
      const value = variables[name];
      return value !== undefined && value !== null ? String(value) : match;
    });
  }

  /**
   * Format currency for BD locale
   */
  formatCurrency(amount: number, locale?: string): string {
    const normalizedLocale = this.normalizeLocale(locale);
    if (normalizedLocale === NOTIFICATION_LOCALE.BN) {
      return `৳${amount.toLocaleString('bn-BD')}`;
    }
    return `৳${amount.toLocaleString('en-BD')}`;
  }

  /**
   * Format date for BD timezone
   */
  formatDate(date: Date | string, locale?: string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const normalizedLocale = this.normalizeLocale(locale);
    const tz = 'Asia/Dhaka';

    if (normalizedLocale === NOTIFICATION_LOCALE.BN) {
      return d.toLocaleString('bn-BD', { timeZone: tz });
    }
    return d.toLocaleString('en-BD', { timeZone: tz });
  }

  /**
   * Normalize locale string
   */
  private normalizeLocale(locale?: string): string {
    if (!locale) return DEFAULT_NOTIFICATION_LOCALE;
    const normalized = locale.toLowerCase().trim();
    if (SUPPORTED_LOCALES.includes(normalized)) {
      return normalized;
    }
    // Handle "bn-BD" → "bn"
    const base = normalized.split('-')[0];
    if (SUPPORTED_LOCALES.includes(base)) return base;
    return DEFAULT_NOTIFICATION_LOCALE;
  }
}
