/**
 * AppModule — notification-service root module
 * @module notification-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (global buses)
 *  - CommonModule (kernel + infra globals)
 *  - Feature modules (notification, template, schedule, broadcast, preference, webhook, health)
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { CommonModule } from './common/index.js';
import { NotificationModule } from './notification/index.js';
import { TemplateModule } from './template/index.js';
import { ScheduleModule } from './schedule/index.js';
import { BroadcastModule } from './broadcast/index.js';
import { PreferenceModule } from './preference/index.js';
import { WebhookModule } from './webhook/index.js';
import { HealthModule } from './health/index.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),

    CommonModule,

    NotificationModule,
    TemplateModule,
    ScheduleModule,
    BroadcastModule,
    PreferenceModule,
    WebhookModule,
    HealthModule,
  ],
})
export class AppModule {}
