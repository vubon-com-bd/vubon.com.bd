// ═══════════════════════════════════════════════════════
// Modules Layer — Barrel Export
// ═══════════════════════════════════════════════════════

// Root
export { AppModule } from './app.module';

// Feature Modules
export { NotificationModule } from './notification';
export { EmailModule } from './email';
export { SmsModule } from './sms';
export { PushModule } from './push';
export { InAppModule } from './in-app';
export { TemplateModule } from './template';
export { ScheduleModule } from './schedule';
export { BroadcastModule } from './broadcast';
export { DigestModule } from './digest';
export { PreferenceModule } from './preference';
export { DeviceModule } from './device';
export { WebhookModule } from './webhook';
export { DeliveryModule } from './delivery';

// Provider Gateways
export { ProviderGatewaysModule } from './provider-gateways';

// Common
export * from './common';
