/**
 * NotificationAppModule — root module
 * @module notification-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (single bus instance)
 *  - NotificationCommonModule (kernel + infra globals)
 *  - Feature modules
 *  - HealthModule
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';

// ─── Common (kernel + infra globals) ────────
import { NotificationCommonModule } from './common/index.js';

// ─── Health ─────────────────────────────────
import { HealthModule } from './health/index.js';

// ─── Feature modules ────────────────────────
import { NotificationModule } from './notification/index.js';
import { AnalyticsModule } from './analytics/index.js';
import { EmailModule } from './email/index.js';
import { SmsModule } from './sms/index.js';
import { PushModule } from './push/index.js';
import { InAppModule } from './in-app/index.js';
import { TemplateModule } from './template/index.js';
import { ScheduleModule } from './schedule/index.js';
import { BroadcastModule } from './broadcast/index.js';
import { DigestModule } from './digest/index.js';
import { PreferenceModule } from './preference/index.js';
import { DeviceModule } from './device/index.js';
import { WebhookModule } from './webhook/index.js';
import { DeliveryModule } from './delivery/index.js';
import { ProviderGatewaysModule } from './provider-gateways/index.js';
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // ─── Root config (global) ───────────────
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // ─── Root CQRS (single bus) ─────────────
    CqrsModule.forRoot(),

    // ─── Common (kernel + notification infra) ─
    NotificationCommonModule,

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Feature modules ────────────────────
    NotificationModule,
    AnalyticsModule,
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
  ],
  providers: [JwtStrategy],
})
export class NotificationAppModule {}

// ─── Conventional alias for main.ts ─────────
export { NotificationAppModule as AppModule };
