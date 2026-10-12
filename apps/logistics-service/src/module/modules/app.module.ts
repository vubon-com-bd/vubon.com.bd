/**
 * AppModule — logistics-service root module
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { CommonModule } from './common/index.js';
import { LogisticsModule } from './logistics/index.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),
    CommonModule,
    LogisticsModule,
  ],
})
export class AppModule {
  constructor(eventBus: EventBusService) {
    eventBus.setServiceName('logistics');
  }
}
