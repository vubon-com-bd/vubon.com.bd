/**
 * Handler helpers — i18n integration for all notification handlers
 * @module notification-service/application/events/external
 */
import { I18nService } from '../../../domain/services/i18n.service.js';

export interface ResolvedNotification {
  readonly subject: string;
  readonly body: string;
  readonly locale: string;
}

/**
 * Resolve template with locale + variables
 * Falls back to default English text if Bangla missing
 */
export function resolveTemplate(
  i18n: I18nService,
  templateKey: string,
  locale: string | undefined,
  variables: Record<string, unknown>,
  fallback: { subject: string; body: string },
): ResolvedNotification {
  const template = i18n.resolve(templateKey, locale);

  // If I18nService returned the key (no template), use fallback
  if (template.body === templateKey) {
    return {
      subject: fallback.subject,
      body: i18n.interpolate(fallback.body, variables),
      locale: 'en',
    };
  }

  return {
    subject: i18n.interpolate(template.subject, variables),
    body: i18n.interpolate(template.body, variables),
    locale: template.locale,
  };
}

/**
 * Get user locale from payload (assumes user event carries it)
 */
export function getLocale(payload: Record<string, unknown>): string {
  return (payload.locale as string) ?? (payload.preferredLocale as string) ?? 'bn';  // Bangladesh default
}
