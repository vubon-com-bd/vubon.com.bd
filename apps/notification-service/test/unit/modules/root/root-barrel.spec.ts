/**
 * Modules Root Barrel — Export completeness
 * @module notification-service/test/unit/modules/root
 */
import * as ModulesBarrel from '@modules/index.js';

describe('Modules Root Barrel', () => {
  it('should export AppModule', () => {
    expect(ModulesBarrel.AppModule).toBeDefined();
  });

  it('should export NotificationAppModule', () => {
    expect(ModulesBarrel.NotificationAppModule).toBeDefined();
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

  it('should export all 14 feature modules', () => {
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

  it('should export command/query handler arrays', () => {
    const arrays = [
      'NOTIFICATION_COMMAND_HANDLERS',
      'NOTIFICATION_QUERY_HANDLERS',
      'NOTIFICATION_SAGAS',
      'EMAIL_COMMAND_HANDLERS',
      'SMS_COMMAND_HANDLERS',
      'PUSH_COMMAND_HANDLERS',
      'IN_APP_COMMAND_HANDLERS',
      'TEMPLATE_COMMAND_HANDLERS',
      'TEMPLATE_QUERY_HANDLERS',
      'SCHEDULE_COMMAND_HANDLERS',
      'SCHEDULE_QUERY_HANDLERS',
      'SCHEDULE_SAGAS',
      'BROADCAST_COMMAND_HANDLERS',
      'BROADCAST_QUERY_HANDLERS',
      'BROADCAST_SAGAS',
      'DIGEST_COMMAND_HANDLERS',
      'DIGEST_QUERY_HANDLERS',
      'PREFERENCE_COMMAND_HANDLERS',
      'PREFERENCE_QUERY_HANDLERS',
      'DEVICE_COMMAND_HANDLERS',
      'DEVICE_QUERY_HANDLERS',
      'WEBHOOK_COMMAND_HANDLERS',
      'WEBHOOK_QUERY_HANDLERS',
      'DELIVERY_QUERY_HANDLERS',
    ];
    for (const array of arrays) {
      expect(ModulesBarrel[array as keyof typeof ModulesBarrel]).toBeDefined();
    }
  });

  it('should export feature health indicators', () => {
    expect(ModulesBarrel.ScheduleHealthIndicator).toBeDefined();
    expect(ModulesBarrel.BroadcastHealthIndicator).toBeDefined();
  });

  it('should export provider sub-modules', () => {
    const modules = [
      'SendgridProviderModule',
      'MailgunProviderModule',
      'SesProviderModule',
      'TwilioProviderModule',
      'FcmProviderModule',
      'ApnsProviderModule',
      'WebhookProviderModule',
    ];
    for (const mod of modules) {
      expect(ModulesBarrel[mod as keyof typeof ModulesBarrel]).toBeDefined();
    }
  });
});
