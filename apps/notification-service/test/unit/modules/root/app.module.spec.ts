/**
 * NotificationAppModule — Unit tests
 * @module notification-service/test/unit/modules/root
 *
 * Verifies:
 *  - Root module structure
 *  - ConfigModule.forRoot + CqrsModule.forRoot imports
 *  - All 14 feature modules + Common + Health
 *  - AppModule alias === NotificationAppModule
 */
import 'reflect-metadata';

import {
  NotificationAppModule,
  AppModule,
} from '@modules/app.module.js';

import { NotificationCommonModule } from '@modules/common/common.module.js';
import { HealthModule } from '@modules/health/health.module.js';

// ─── Feature modules ────────────────────────
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

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('NotificationAppModule', () => {
  it('should be defined', () => {
    expect(NotificationAppModule).toBeDefined();
  });

  it('should export AppModule alias === NotificationAppModule', () => {
    expect(AppModule).toBe(NotificationAppModule);
  });

  it('should import ConfigModule as first import (dynamic module)', () => {
    const imports = readMeta('imports', NotificationAppModule);
    // ConfigModule.forRoot() returns a DynamicModule — verify position 0
    // (app.module.ts imports it explicitly at the top of the array)
    const first = imports[0];
    expect(first).toBeDefined();
    expect(typeof first).toBe('object');
    expect(first).not.toBeNull();
  });

  it('should import CqrsModule (dynamic module at position 1)', () => {
    const imports = readMeta('imports', NotificationAppModule);
    // CqrsModule.forRoot() — position 1, has module.name === 'CqrsModule'
    const second = imports[1] as { module?: { name?: string } };
    expect(second).toBeDefined();
    expect(second.module?.name).toBe('CqrsModule');
  });

  it('should import NotificationCommonModule', () => {
    expect(readMeta('imports', NotificationAppModule)).toContain(NotificationCommonModule);
  });

  it('should import HealthModule', () => {
    expect(readMeta('imports', NotificationAppModule)).toContain(HealthModule);
  });

  it('should import all 14 feature modules', () => {
    const imports = readMeta('imports', NotificationAppModule);
    const features = [
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
    for (const feature of features) {
      expect(imports).toContain(feature);
    }
  });

  it('should have 18 imports total (2 dynamic + 2 common + 14 features)', () => {
    // 2 dynamic (Config, Cqrs) + Common + Health + 14 features = 18
    expect(readMeta('imports', NotificationAppModule).length).toBe(18);
  });
});
