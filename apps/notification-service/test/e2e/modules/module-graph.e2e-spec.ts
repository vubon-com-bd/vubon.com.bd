/**
 * Module Graph E2E — verify all feature modules wired
 * @module notification-service/test/e2e/modules
 *
 * Verifies:
 *  - All 14 feature modules registered in AppModule
 *  - Common module @Global() applied
 *  - HealthModule registered
 */
import 'reflect-metadata';
import { NotificationAppModule } from '@modules/app.module.js';
import { NotificationCommonModule } from '@modules/common/common.module.js';
import { HealthModule } from '@modules/health/health.module.js';

// ─── Features ───────────────────────────────
import { NotificationModule } from '@modules/notification/notification.module.js';
import { EmailModule } from '@modules/email/email.module.js';
import { SmsModule } from '@modules/sms/sms.module.js';
import { PushModule } from '@modules/push/push.module.js';
import { InAppModule } from '@modules/in-app/in-app.module.js';
import { TemplateModule } from '@modules/template/template.module.js';
import { ScheduleModule } from '@modules/schedule/schedule.module.js';
import { BroadcastModule } from '@modules/broadcast/broadcast.module.js';
import { DigestModule } from '@modules/digest/digest.module.js';
import { PreferenceModule } from '@modules/preference/preference.module.js';
import { DeviceModule } from '@modules/device/device.module.js';
import { WebhookModule } from '@modules/webhook/webhook.module.js';
import { DeliveryModule } from '@modules/delivery/delivery.module.js';
import { ProviderGatewaysModule } from '@modules/provider-gateways/provider-gateways.module.js';

const readImports = (target: unknown): unknown[] =>
  (Reflect.getMetadata('imports', target) as unknown[] | undefined) ?? [];

describe('Module Graph (E2E)', () => {
  it('should have NotificationCommonModule in AppModule imports', () => {
    expect(readImports(NotificationAppModule)).toContain(NotificationCommonModule);
  });

  it('should have HealthModule in AppModule imports', () => {
    expect(readImports(NotificationAppModule)).toContain(HealthModule);
  });

  it('should have all 14 feature modules in AppModule imports', () => {
    const imports = readImports(NotificationAppModule);
    const expectedFeatures = [
      NotificationModule,
      EmailModule,
      SmsModule,
      PushModule,
      InAppModule,
      TemplateModule,
      ScheduleModule,
      BroadcastModule,
      DigestModule,
      PreferenceModule,
      DeviceModule,
      WebhookModule,
      DeliveryModule,
      ProviderGatewaysModule,
    ];

    for (const feature of expectedFeatures) {
      expect(imports).toContain(feature);
    }
  });

  it('should have @Global() on NotificationCommonModule', () => {
    const isGlobal = Reflect.getMetadata('__module:global__', NotificationCommonModule);
    expect(isGlobal).toBe(true);
  });

  it('should import KernelCommonModule in NotificationCommonModule', () => {
    const imports = readImports(NotificationCommonModule);
    // KernelCommonModule must be present (may be class or dynamic)
    const hasKernel = imports.some((i) => {
      if (typeof i === 'function') return i.name === 'KernelCommonModule';
      if (typeof i === 'object' && i !== null && 'module' in i) {
        const mod = (i as { module?: { name?: string } }).module;
        return mod?.name === 'KernelCommonModule';
      }
      return false;
    });
    expect(hasKernel).toBe(true);
  });

  it('should have exactly 18 imports in AppModule', () => {
    // 2 dynamic (Config + Cqrs) + Common + Health + 14 features
    expect(readImports(NotificationAppModule).length).toBe(18);
  });
});
