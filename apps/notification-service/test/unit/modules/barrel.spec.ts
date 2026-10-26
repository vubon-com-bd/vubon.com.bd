/**
 * Modules Layer Barrel — Export completeness
 * @module notification-service/test/unit/modules
 *
 * Verifies that the root modules barrel exports all expected members.
 */
import * as ModulesBarrel from '@modules/index.js';
import { jest } from '@jest/globals';

describe('Modules Layer Barrel', () => {
  it('should export NotificationAppModule', () => {
    expect(ModulesBarrel.NotificationAppModule).toBeDefined();
  });

  it('should export AppModule alias', () => {
    expect(ModulesBarrel.AppModule).toBeDefined();
    expect(ModulesBarrel.AppModule).toBe(ModulesBarrel.NotificationAppModule);
  });

  it('should export NotificationCommonModule', () => {
    expect(ModulesBarrel.NotificationCommonModule).toBeDefined();
  });

  it('should export HealthModule', () => {
    expect(ModulesBarrel.HealthModule).toBeDefined();
  });

  it('should export NotificationHealthIndicator', () => {
    expect(ModulesBarrel.NotificationHealthIndicator).toBeDefined();
  });

  it('should export all feature modules', () => {
    const features = [
      'NotificationModule',
      'EmailModule',
      'SmsModule',
      'PushModule',
      'InAppModule',
      'TemplateModule',
      'ScheduleModule',
      'BroadcastModule',
      'DigestModule',
      'PreferenceModule',
      'DeviceModule',
      'WebhookModule',
      'DeliveryModule',
      'ProviderGatewaysModule',
    ];

    for (const feature of features) {
      expect(ModulesBarrel[feature as keyof typeof ModulesBarrel]).toBeDefined();
    }
  });
});
