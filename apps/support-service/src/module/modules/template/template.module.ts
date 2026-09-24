import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TemplateController } from '../../interfaces/controllers/rest/template.controller';
import { CreateTemplateHandler } from '../../application/commands/template/create-template.handler';
import { UpdateTemplateHandler } from '../../application/commands/template/update-template.handler';
import { TemplateService } from '../../application/services/impl/template.service';

@Module({
  imports: [CqrsModule],
  controllers: [TemplateController],
  providers: [CreateTemplateHandler, UpdateTemplateHandler, TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
