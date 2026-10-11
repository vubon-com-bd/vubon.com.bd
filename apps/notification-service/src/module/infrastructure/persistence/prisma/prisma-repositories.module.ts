/**
 * PrismaRepositoriesModule — wires Prisma repositories into DI
 * @module notification-service/infrastructure/persistence/prisma
 */
import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/infrastructure/persistence/prisma';

import { NOTIFICATION_REPOSITORY } from '../../../domain/repositories/notification.repository.interface.js';
import { TEMPLATE_REPOSITORY } from '../../../domain/repositories/template.repository.interface.js';
import { SCHEDULE_REPOSITORY } from '../../../domain/repositories/schedule.repository.interface.js';
import { BROADCAST_REPOSITORY } from '../../../domain/repositories/broadcast.repository.interface.js';
import { DIGEST_REPOSITORY } from '../../../domain/repositories/digest.repository.interface.js';
import { PREFERENCE_REPOSITORY } from '../../../domain/repositories/preference.repository.interface.js';
import { DEVICE_REPOSITORY } from '../../../domain/repositories/device.repository.interface.js';
import { WEBHOOK_REPOSITORY } from '../../../domain/repositories/webhook.repository.interface.js';

import { NotificationPrismaRepository } from './repositories/notification.prisma.repository.js';
import { TemplatePrismaRepository } from './repositories/template.prisma.repository.js';
import { SchedulePrismaRepository } from './repositories/schedule.prisma.repository.js';
import { BroadcastPrismaRepository } from './repositories/broadcast.prisma.repository.js';
import { DigestPrismaRepository } from './repositories/digest.prisma.repository.js';
import { PreferencePrismaRepository } from './repositories/preference.prisma.repository.js';
import { DevicePrismaRepository } from './repositories/device.prisma.repository.js';
import { WebhookPrismaRepository } from './repositories/webhook.prisma.repository.js';

const REPOSITORIES = [
  NotificationPrismaRepository,
  TemplatePrismaRepository,
  SchedulePrismaRepository,
  BroadcastPrismaRepository,
  DigestPrismaRepository,
  PreferencePrismaRepository,
  DevicePrismaRepository,
  WebhookPrismaRepository,
];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    ...REPOSITORIES,
    { provide: NOTIFICATION_REPOSITORY, useExisting: NotificationPrismaRepository },
    { provide: TEMPLATE_REPOSITORY, useExisting: TemplatePrismaRepository },
    { provide: SCHEDULE_REPOSITORY, useExisting: SchedulePrismaRepository },
    { provide: BROADCAST_REPOSITORY, useExisting: BroadcastPrismaRepository },
    { provide: DIGEST_REPOSITORY, useExisting: DigestPrismaRepository },
    { provide: PREFERENCE_REPOSITORY, useExisting: PreferencePrismaRepository },
    { provide: DEVICE_REPOSITORY, useExisting: DevicePrismaRepository },
    { provide: WEBHOOK_REPOSITORY, useExisting: WebhookPrismaRepository },
  ],
  exports: [
    ...REPOSITORIES,
    NOTIFICATION_REPOSITORY,
    TEMPLATE_REPOSITORY,
    SCHEDULE_REPOSITORY,
    BROADCAST_REPOSITORY,
    DIGEST_REPOSITORY,
    PREFERENCE_REPOSITORY,
    DEVICE_REPOSITORY,
    WEBHOOK_REPOSITORY,
  ],
})
export class PrismaRepositoriesModule {}
