import { describe, it, expect } from '@jest/globals';
import * as C from '../../../../../src/module/domain/value-objects/composites/index.js';

describe('Composites barrel', () => {
  const names = [
    'NotificationVO', 'NotificationContentVO', 'NotificationRecipientVO',
    'NotificationActionsVO', 'NotificationActionEntryVO', 'NotificationDeliveryVO',
    'NotificationReadVO', 'NotificationReferenceVO', 'TemplateVO', 'TemplateVariableVO',
    'ScheduleVO', 'BroadcastVO', 'DigestVO', 'PreferenceVO', 'DeviceVO',
    'WebhookVO', 'WebhookPayloadVO',
  ];
  for (const n of names) {
    it(`exports ${n}`, () => {
      expect((C as Record<string, unknown>)[n]).toBeDefined();
    });
  }
});
