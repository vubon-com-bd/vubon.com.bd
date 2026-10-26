/**
 * Template Engine Module
 * @module notification-service/infrastructure/template-engine
 *
 * Provides the multi-engine template renderer to the app।
 */
import { Global, Module } from '@nestjs/common';

import { HandlebarsEngine } from './engines/handlebars.engine.js';
import { MustacheEngine } from './engines/mustache.engine.js';
import { EjsEngine } from './engines/ejs.engine.js';
import { MjmlEngine } from './engines/mjml.engine.js';

import { TemplateEngineService } from './template.service.js';

@Global()
@Module({
  providers: [
    HandlebarsEngine,
    MustacheEngine,
    EjsEngine,
    MjmlEngine,
    TemplateEngineService,
  ],
  exports: [TemplateEngineService],
})
export class TemplateEngineModule {}
