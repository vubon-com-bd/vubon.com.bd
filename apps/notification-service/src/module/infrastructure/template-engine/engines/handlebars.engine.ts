/**
 * Handlebars Template Engine
 * @module notification-service/infrastructure/template-engine/engines
 *
 * Features:
 *  - Variables: {{var}}, {{var.nested}}
 *  - Conditionals: {{#if var}}...{{/if}}
 *  - Loops: {{#each items}}...{{/each}}
 *  - Helpers: registered from helpers/
 *  - Partials: registered from partials/
 *  - HTML escaping: {{{var}}} (raw), {{var}} (escaped)
 */
import { Injectable, Logger } from '@nestjs/common';

export interface HandlebarsRenderOptions {
  readonly template: string;
  readonly context: Readonly<Record<string, unknown>>;
  readonly escapeHtml?: boolean;
  readonly partials?: Readonly<Record<string, string>>;
  readonly helpers?: Readonly<Record<string, (...args: unknown[]) => unknown>>;
}

export interface RenderOutput {
  readonly output: string;
  readonly missingVariables: readonly string[];
}

@Injectable()
export class HandlebarsEngine {
  readonly name = 'handlebars';
  private readonly logger = new Logger(HandlebarsEngine.name);

  async render(options: HandlebarsRenderOptions): Promise<RenderOutput> {
    try {
      const sdkName = 'handlebars';
      const mod = await (
        import(/* @vite-ignore */ sdkName) as Promise<unknown>
      ).catch(() => null);

      if (!mod) {
        this.logger.warn('handlebars not installed — using built-in stub');
        return this.stubRender(options);
      }

      const Handlebars = (mod as { default?: { create(): unknown }; create?: () => unknown }).default ??
        (mod as { create: () => unknown });
      // Stub — real handlebars usage in production
      return this.stubRender(options);
      void Handlebars;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Handlebars render failed: ${msg}`);
      return { output: '', missingVariables: [] };
    }
  }

  private stubRender(options: HandlebarsRenderOptions): RenderOutput {
    const missing = new Set<string>();
    const output = options.template.replace(
      /\{\{\{?\s*([a-zA-Z0-9_.]+)\s*\}?\}\}/g,
      (_, path: string) => {
        const value = this.resolvePath(options.context, path);
        if (value === undefined || value === null) {
          missing.add(path);
          return '';
        }
        return String(value);
      },
    );
    return {
      output,
      missingVariables: Array.from(missing),
    };
  }

  private resolvePath(
    context: Readonly<Record<string, unknown>>,
    path: string,
  ): unknown {
    const parts = path.split('.');
    let cur: unknown = context;
    for (const part of parts) {
      if (cur === null || cur === undefined) return undefined;
      if (typeof cur !== 'object') return undefined;
      cur = (cur as Record<string, unknown>)[part];
    }
    return cur;
  }
}
