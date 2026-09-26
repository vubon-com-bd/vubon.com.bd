/**
 * TemplateModule
 * @module support-service/modules/template
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TemplateService } from '../../application/services/impl/template.service';
import { TemplateMapper } from '../../application/mappers/template.mapper';
import { CreateTemplateHandler } from '../../application/commands/template/create-template.handler';
import { UpdateTemplateHandler } from '../../application/commands/template/update-template.handler';
import { RenderTemplateHandler } from '../../application/commands/template/render-template.handler';
import { GetTemplateHandler } from '../../application/queries/template/get-template.handler';
import { ListTemplatesHandler } from '../../application/queries/template/list-templates.handler';
import { TemplateController } from '../../interfaces/controllers/rest/template.controller';
import { TemplateControllerMapper } from '../../interfaces/mappers/template.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [TemplateController],
  providers: [
    TemplateService,
    TemplateMapper,
    TemplateControllerMapper,
    CreateTemplateHandler,
    UpdateTemplateHandler,
    RenderTemplateHandler,
    GetTemplateHandler,
    ListTemplatesHandler,
  ],
  exports: [TemplateService],
})
export class TemplateModule {}
