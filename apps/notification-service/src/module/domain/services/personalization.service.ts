/**
 * PersonalizationService
 * @module notification-service/domain/services
 *
 * Enhances notification data with user-specific personalization:
 *  - locale
 *  - timezone
 *  - user name
 *  - preferences
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface PersonalizationContext {
  readonly userId: string;
  readonly userName?: string;
  readonly locale: string;
  readonly timezone: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface PersonalizeInput {
  readonly data: Readonly<Record<string, unknown>>;
  readonly context: PersonalizationContext;
}

export interface PersonalizeResult {
  readonly data: Readonly<Record<string, unknown>>;
  readonly appliedKeys: readonly string[];
}

const LOCALE_MAP: Readonly<Record<string, string>> = {
  en: 'en-US',
  bn: 'bn-BD',
  hi: 'hi-IN',
  ar: 'ar-SA',
};

const TIMEZONE_DEFAULT = 'Asia/Dhaka';

export class PersonalizationService {
  static personalize(input: PersonalizeInput): PersonalizeResult {
    if (!input.context.userId || input.context.userId.trim().length === 0) {
      throw new BusinessRuleError('userId required for personalization', 'INVALID_USER_ID');
    }

    const enriched: Record<string, unknown> = { ...input.data };
    const applied: string[] = [];

    // Standard tokens
    const tokens: Readonly<Record<string, unknown>> = {
      'user.id': input.context.userId,
      'user.name': input.context.userName ?? '',
      'user.firstName': input.context.firstName ?? '',
      'user.lastName': input.context.lastName ?? '',
      'user.locale': LOCALE_MAP[input.context.locale] ?? input.context.locale,
      'user.timezone': input.context.timezone || TIMEZONE_DEFAULT,
      'now.iso': new Date().toISOString(),
      'now.date': new Date().toISOString().slice(0, 10),
    };

    for (const [key, value] of Object.entries(tokens)) {
      if (!(key in enriched)) {
        enriched[key] = value;
        applied.push(key);
      }
    }

    // Metadata pass-through
    if (input.context.metadata) {
      for (const [k, v] of Object.entries(input.context.metadata)) {
        if (!(k in enriched)) {
          enriched[k] = v;
          applied.push(k);
        }
      }
    }

    return { data: enriched, appliedKeys: applied };
  }

  /** Format greeting based on timezone + hour */
  static greeting(timezone: string, now: Date = new Date()): string {
    let hour: number;
    try {
      hour = Number(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: false,
          timeZone: timezone,
        }).format(now),
      );
    } catch {
      hour = now.getHours();
    }
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
