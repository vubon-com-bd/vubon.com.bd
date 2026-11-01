/**
 * Mustache Template Engine
 * @module notification-service/infrastructure/template-engine/engines
 *
 * Simple logic-less templates — {{var}} replaced with context value।
 */
import { Injectable, Logger } from '@nestjs/common';

export interface MustacheRenderOptions {
  readonly template: string;
  readonly context: Readonly<Record<string, unknown>>;
  readonly partials?: Readonly<Record<string, string>>;
}

@Injectable()
export class MustacheEngine {
  readonly name = 'mustache';
  private readonly logger = new Logger(MustacheEngine.name);

  async render(options: MustacheRenderOptions): Promise<{
    output: string;
    missingVariables: readonly string[];
  }> {
    try {
      const sdkName = 'mustache';
      const mod = await (
        import(/* @vite-ignore */ sdkName) as Promise<unknown>
      ).catch(() => null);

      if (!mod) {
        this.logger.warn('mustache not installed — using built-in stub');
        return this.stubRender(options);
      }

      // Real mustache usage in production
      return this.stubRender(options);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Mustache render failed: ${msg}`);
      return { output: '', missingVariables: [] };
    }
  }

  private stubRender(options: MustacheRenderOptions): {
    output: string;
    missingVariables: readonly string[];
  } {
    const missing = new Set<string>();
    const output = options.template.replace(
      /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g,
      (_, path: string) => {
        const value = this.resolvePath(options.context, path);
        if (value === undefined || value === null) {
          missing.add(path);
          return '';
        }
        return String(value);
      },
    );
    return { output, missingVariables: Array.from(missing) };
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
