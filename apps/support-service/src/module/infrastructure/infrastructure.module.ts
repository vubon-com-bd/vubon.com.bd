import { Module } from '@nestjs/common';

// Kernel modules (global)
import {
  PrismaModule,
  RedisModule,
  EmailModule,
  SmsModule,
  PushModule,
  QueueModule,
} from '@vubon/shared-kernel/infrastructure';

// App-level
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';
import { WebSocketModule } from './websocket/websocket.module';
import { ChatbotEngineModule } from './chatbot-engine/chatbot.module';
import { EmailModule as AppEmailModule } from './external/email/email.module';
import { SmsModule as AppSmsModule } from './external/sms/sms.module';
import { PushModule as AppPushModule } from './external/push/push.module';
import { StorageModule } from './external/storage/storage.module';
import { AiModule } from './external/ai/ai.module';

// Repositories
import * as PrismaRepos from './persistence/prisma/repositories';
import * as CacheRepos from './persistence/cache/repositories';

// Services
import * as InternalServices from './services/internal';
import * as ExternalClients from './services/external';

// Queues + Workers
import * as Queues from './queues';
import * as Workers from './workers';

const PRISMA_REPOSITORIES = Object.values(PrismaRepos);
const CACHE_REPOSITORIES = Object.values(CacheRepos);
const INTERNAL_SERVICES = Object.values(InternalServices);
const EXTERNAL_CLIENTS = Object.values(ExternalClients);
const QUEUE_PROVIDERS = Object.values(Queues);
const WORKER_PROVIDERS = Object.values(Workers);

@Module({
  imports: [
    PrismaModule,
    AppPrismaModule,
    RedisModule,
    QueueModule,
    EmailModule,
    SmsModule,
    PushModule,
    AppEmailModule,
    AppSmsModule,
    AppPushModule,
    StorageModule,
    AiModule,
    WebSocketModule,
    ChatbotEngineModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUE_PROVIDERS,
    ...WORKER_PROVIDERS,
  ],
  exports: [
    AppPrismaModule,
    AppEmailModule,
    AppSmsModule,
    AppPushModule,
    StorageModule,
    AiModule,
    WebSocketModule,
    ChatbotEngineModule,
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_CLIENTS,
    ...QUEUE_PROVIDERS,
  ],
})
export class InfrastructureModule {}
