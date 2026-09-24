import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TemplateController } from '../../interfaces/controllers/rest/template.controller';

// Services
import { TemplateService } from '../../application/services/impl/template.service';
import { TemplateVariableService } from '../../application/services/impl/template-variable.service';

// Repositories
import { TemplatePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/template.prisma.repository';
import { TemplateVariablePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/template-variable.prisma.repository';
import { TemplateCacheRepository } from '../../infrastructure/persistence/cache/repositories/template.cache.repository';

// Template Engine
import { TemplateEngineModule } from '../../infrastructure/template-engine/template.module';

// Command handlers
import {
  CreateTemplateHandler,
  UpdateTemplateHandler,
  TestTemplateHandler,
} from '../../application/commands/template';

// Query handlers
import {
  GetTemplateHandler,
  GetTemplateByNameHandler,
} from '../../application/queries/template';

@Module({
  imports: [CqrsModule, TemplateEngineModule],
  controllers: [TemplateController],
  providers: [
    // Repositories
    TemplatePrismaRepository,
    TemplateVariablePrismaRepository,
    TemplateCacheRepository,

    // Services
    TemplateService,
    TemplateVariableService,

    // Command handlers
    CreateTemplateHandler,
    UpdateTemplateHandler,
    TestTemplateHandler,

    // Query handlers
    GetTemplateHandler,
    GetTemplateByNameHandler,
  ],
  exports: [
    TemplateService,
    TemplatePrismaRepository,
    TemplateVariablePrismaRepository,
    TemplateCacheRepository,
  ],
})
export class TemplateModule {}
