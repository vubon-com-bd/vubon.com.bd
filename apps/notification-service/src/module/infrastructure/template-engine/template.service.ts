/**
 * TemplateEngineService — multi-engine orchestrator
 * @module notification-service/infrastructure/template-engine
 *
 * Dispatches render requests to the appropriate engine based on:
 *  - Template format (handlebars/mustache/ejs/mjml)
 *  - Or auto-detection from syntax
 *
 * Used by:
 *  - TemplateService (application layer) — for test rendering
 *  - EmailSenderWorker — for runtime rendering
 */
import { Injectable, Logger } from '@nestjs/common';

import { HandlebarsEngine } from './engines/handlebars.engine.js';
import { MustacheEngine } from './engines/mustache.engine.js';
import { EjsEngine } from './engines/ejs.engine.js';
import { MjmlEngine } from './engines/mjml.engine.js';

import { HeaderPartial } from './partials/header.partial.js';
import { FooterPartial } from './partials/footer.partial.js';
import { ButtonPartial } from './partials/button.partial.js';

import { FormatCurrencyHelper } from './helpers/format-currency.helper.js';
import { FormatDateHelper } from './helpers/format-date.helper.js';
import { ConditionalHelper } from './helpers/conditional.helper.js';

export type TemplateEngineType = 'handlebars' | 'mustache' | 'ejs' | 'mjml';

export interface RenderRequest {
  readonly template: string;
  readonly context: Readonly<Record<string, unknown>>;
  readonly engine?: TemplateEngineType;
  readonly escapeHtml?: boolean;
}

export interface RenderResponse {
  readonly output: string;
  readonly missingVariables: readonly string[];
  readonly engine: TemplateEngineType;
  readonly renderedAt: string;
}

@Injectable()
export class TemplateEngineService {
  private readonly logger = new Logger(TemplateEngineService.name);

  constructor(
    private readonly handlebarsEngine: HandlebarsEngine,
    private readonly mustacheEngine: MustacheEngine,
    private readonly ejsEngine: EjsEngine,
    private readonly mjmlEngine: MjmlEngine,
  ) {}

  // ═══════════════ Main render ═══════════════
  async render(request: RenderRequest): Promise<RenderResponse> {
    const engine = request.engine ?? this.detectEngine(request.template);
    const renderedAt = new Date().toISOString();

    this.logger.debug(`Rendering with engine=${engine} templateLength=${request.template.length}`);

    switch (engine) {
      case 'handlebars': {
        const result = await this.handlebarsEngine.render({
          template: request.template,
          context: request.context,
          escapeHtml: request.escapeHtml,
        });
        return {
          output: result.output,
          missingVariables: result.missingVariables,
          engine,
          renderedAt,
        };
      }
      case 'mustache': {
        const result = await this.mustacheEngine.render({
          template: request.template,
          context: request.context,
        });
        return {
          output: result.output,
          missingVariables: result.missingVariables,
          engine,
          renderedAt,
        };
      }
      case 'ejs': {
        const result = await this.ejsEngine.render({
          template: request.template,
          context: request.context,
        });
        return {
          output: result.output,
          missingVariables: result.missingVariables,
          engine,
          renderedAt,
        };
      }
      case 'mjml': {
        const result = await this.mjmlEngine.render({
          mjml: request.template,
          context: request.context,
        });
        return {
          output: result.html,
          missingVariables: result.errors,
          engine,
          renderedAt,
        };
      }
    }
  }

  // ═══════════════ Auto-detect engine from syntax ═══════════════
  detectEngine(template: string): TemplateEngineType {
    // MJML detection
    if (/<mjml[\s>]/i.test(template) || /<mj-section[\s>]/i.test(template)) {
      return 'mjml';
    }

    // EJS detection
    if (/<%[-=]/.test(template)) {
      return 'ejs';
    }

    // Handlebars-specific (helpers, blocks)
    if (/\{\{#(if|each|unless|with)\s/.test(template) || /\{\{[a-z]+\s+/.test(template)) {
      return 'handlebars';
    }

    // Default: handlebars (superset of mustache for basic interpolation)
    return 'handlebars';
  }

  // ═══════════════ Helpers & partials ═══════════════
  /** Get all registered helpers (name → fn) for engine registration */
  getHelpers(): Readonly<Record<string, (...args: never[]) => unknown>> {
    return {
      ...ConditionalHelper.registry(),
      formatCurrency: FormatCurrencyHelper.format.bind(FormatCurrencyHelper) as never,
      formatCurrencyPlain: FormatCurrencyHelper.plain.bind(FormatCurrencyHelper) as never,
      formatDate: FormatDateHelper.format.bind(FormatDateHelper) as never,
      formatDateRelative: FormatDateHelper.relative.bind(FormatDateHelper) as never,
    };
  }

  /** Get all registered partials (name → HTML renderer) */
  getPartials(): Readonly<Record<string, string>> {
    return Object.freeze({
      header: HeaderPartial.render(),
      footer: FooterPartial.render(),
      button: ButtonPartial.render({ label: '{{label}}', url: '{{url}}' }),
    });
  }

  // ═══════════════ Convenience helpers ═══════════════
  /** Quick render — no missing-variable check */
  async renderToString(request: RenderRequest): Promise<string> {
    const result = await this.render(request);
    if (result.missingVariables.length > 0) {
      this.logger.warn(
        `Template rendered with missing vars: ${result.missingVariables.join(', ')}`,
      );
    }
    return result.output;
  }

  /** Validate template without rendering */
  validate(request: RenderRequest): { valid: boolean; issues: readonly string[] } {
    const issues: string[] = [];

    if (request.template.trim().length === 0) {
      issues.push('empty-template');
    }

    // Basic syntax check per engine
    const engine = request.engine ?? this.detectEngine(request.template);
    if (engine === 'handlebars' || engine === 'mustache') {
      const opens = (request.template.match(/\{\{/g) ?? []).length;
      const closes = (request.template.match(/\}\}/g) ?? []).length;
      if (opens !== closes) {
        issues.push(`unbalanced-braces (open=${opens}, close=${closes})`);
      }
    }

    return { valid: issues.length === 0, issues };
  }
}
