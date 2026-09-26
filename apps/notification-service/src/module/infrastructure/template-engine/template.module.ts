import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { HandlebarsEngine } from './engines/handlebars.engine';
import { MustacheEngine } from './engines/mustache.engine';
import { EjsEngine } from './engines/ejs.engine';
import { MjmlEngine } from './engines/mjml.engine';

@Module({
  providers: [
    TemplateService,
    HandlebarsEngine,
    MustacheEngine,
    EjsEngine,
    MjmlEngine,
  ],
  exports: [TemplateService],
})
export class TemplateEngineModule {}
