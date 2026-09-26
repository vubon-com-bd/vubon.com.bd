import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PromptController } from '../../interfaces/controllers/rest/prompt.controller';
import { CompletionController } from '../../interfaces/controllers/rest/completion.controller';

import { PromptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/prompt.prisma.repository';
import { PromptTemplatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/prompt-template.prisma.repository';
import { CompletionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/completion.prisma.repository';
import { CompletionCacheRepository } from '../../infrastructure/persistence/cache/repositories/completion.cache.repository';

import { PromptService } from '../../application/services/impl/prompt.service';
import { PromptTemplateService } from '../../application/services/impl/prompt-template.service';
import { CompletionService } from '../../application/services/impl/completion.service';

import { PromptCommandHandlers } from './commands';
import { PromptQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [PromptController, CompletionController],
  providers: [
    PromptPrismaRepository,
    PromptTemplatePrismaRepository,
    CompletionPrismaRepository,
    CompletionCacheRepository,
    PromptService,
    PromptTemplateService,
    CompletionService,
    ...PromptCommandHandlers,
    ...PromptQueryHandlers,
  ],
  exports: [PromptService, PromptTemplateService, CompletionService],
})
export class PromptModule {}
