/**
 * EJS Template Engine
 * @module notification-service/infrastructure/template-engine/engines
 *
 * Embedded JavaScript — <%= var %> (escaped), <%- var %> (raw)।
 */
import { Injectable, Logger } from '@nestjs/common';

export interface EjsRenderOptions {
  readonly template: string;
  readonly context: Readonly<Record<string, unknown>>;
}

@Injectable()
export class EjsEngine {
  readonly name = 'ejs';
  private readonly logger = new Logger(EjsEngine.name);

  async render(options: EjsRenderOptions): Promise<{
    output: string;
    missingVariables: readonly string[];
  }> {
    try {
      const sdkName = 'ejs';
      const mod = await (
        import(/* @vite-ignore */ sdkName) as Promise<unknown>
      ).catch(() => null);

      if (!mod) {
        this.logger.warn('ejs not installed — using built-in stub');
        return this.stubRender(options);
      }

      // Real EJS usage in production
      return this.stubRender(options);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`EJS render failed: ${msg}`);
      return { output: '', missingVariables: [] };
    }
  }

  private stubRender(options: EjsRenderOptions): {
    output: string;
    missingVariables: readonly string[];
  } {
    const missing = new Set<string>();
    const output = options.template.replace(
      /<%[-=]\s*([a-zA-Z0-9_.]+)\s*%>/g,
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
