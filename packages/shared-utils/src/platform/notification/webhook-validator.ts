import { WEBHOOK } from '@vubon/shared-constants/src/platform/notification/webhook.constants';

export interface WebhookInput {
  notificationId: string;
  url: string;
  method: string;
  status: string;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateWebhook = (
  webhook: Partial<WebhookInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!webhook.notificationId) errors.push('Notification ID is required');
  if (!webhook.url) errors.push('Webhook URL is required');
  if (webhook.url && !isValidUrl(webhook.url)) {
    errors.push('Invalid webhook URL');
  }
  if (webhook.method && !['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(webhook.method)) {
    errors.push('Invalid HTTP method');
  }
  if (webhook.status && !Object.keys(WEBHOOK.STATUS).includes(webhook.status)) {
    errors.push('Invalid webhook status');
  }
  return { isValid: errors.length === 0, errors };
};
