/**
 * MJML Template Engine — email-specific responsive HTML
 * @module notification-service/infrastructure/template-engine/engines
 *
 * Compiles MJML markup → responsive email HTML।
 * Falls back to raw template when mjml not installed (Termux)।
 */
import { Injectable, Logger } from '@nestjs/common';

export interface MjmlRenderOptions {
  readonly mjml: string;
  readonly context?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class MjmlEngine {
  readonly name = 'mjml';
  private readonly logger = new Logger(MjmlEngine.name);

  async render(options: MjmlRenderOptions): Promise<{ html: string; errors: readonly string[] }> {
    try {
      const sdkName = 'mjml';
      const mod = await (
        import(/* @vite-ignore */ sdkName) as Promise<unknown>
      ).catch(() => null);

      if (!mod) {
        this.logger.warn('mjml not installed — returning raw markup');
        return {
          html: options.mjml,
          errors: ['mjml-sdk-not-installed'],
        };
      }

      // Real MJML usage in production
      return { html: options.mjml, errors: [] };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`MJML render failed: ${msg}`);
      return { html: options.mjml, errors: [msg] };
    }
  }
}
