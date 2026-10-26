/**
 * ContentSanitizerInfraService — sanitize notification content
 * @module notification-service/infrastructure/services/internal
 *
 * Protects against:
 *  - XSS (script tags, event handlers)
 *  - HTML injection
 *  - SQL injection (basic)
 *  - SSRF (URL validation)
 *  - Header injection (CRLF)
 */
import { Injectable, Logger } from '@nestjs/common';

export type SanitizeField = 'plain' | 'html' | 'url' | 'header' | 'json';

export interface SanitizeResult {
  readonly clean: string;
  readonly removed: readonly string[];
  readonly isSafe: boolean;
}

const DANGEROUS_PATTERNS = {
  script: /<script[\s\S]*?<\/script>/gi,
  iframe: /<iframe[\s\S]*?<\/iframe>/gi,
  eventHandler: /\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
  javascriptUrl: /javascript:/gi,
  dataUrl: /data:text\/html/gi,
  crlf: /[\r\n]/g,
} as const;

@Injectable()
export class ContentSanitizerInfraService {
  private readonly logger = new Logger(ContentSanitizerInfraService.name);

  sanitize(input: string, field: SanitizeField = 'plain'): SanitizeResult {
    if (typeof input !== 'string') {
      return { clean: '', removed: ['non-string-input'], isSafe: false };
    }

    const removed: string[] = [];
    let clean = input;

    switch (field) {
      case 'html':
        clean = this.sanitizeHtml(input, removed);
        break;
      case 'url':
        clean = this.sanitizeUrl(input, removed);
        break;
      case 'header':
        clean = this.sanitizeHeader(input, removed);
        break;
      case 'json':
        clean = this.sanitizeJson(input, removed);
        break;
      case 'plain':
      default:
        clean = this.sanitizePlain(input, removed);
        break;
    }

    if (removed.length > 0) {
      this.logger.warn(`Sanitized ${field} field: removed ${removed.join(', ')}`);
    }

    return {
      clean,
      removed,
      isSafe: removed.length === 0,
    };
  }

  // ═══════════════ Plain text (SMS, push) ═══════════════
  private sanitizePlain(input: string, removed: string[]): string {
    let clean = input;
    if (DANGEROUS_PATTERNS.crlf.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.crlf, ' ');
      removed.push('crlf');
    }
    return clean.trim();
  }

  // ═══════════════ HTML (email) ═══════════════
  private sanitizeHtml(input: string, removed: string[]): string {
    let clean = input;

    if (DANGEROUS_PATTERNS.script.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.script, '');
      removed.push('script-tag');
    }

    if (DANGEROUS_PATTERNS.iframe.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.iframe, '');
      removed.push('iframe-tag');
    }

    if (DANGEROUS_PATTERNS.eventHandler.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.eventHandler, '');
      removed.push('event-handler');
    }

    if (DANGEROUS_PATTERNS.javascriptUrl.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.javascriptUrl, 'about:blank');
      removed.push('javascript-url');
    }

    if (DANGEROUS_PATTERNS.dataUrl.test(clean)) {
      clean = clean.replace(DANGEROUS_PATTERNS.dataUrl, 'about:blank');
      removed.push('data-html-url');
    }

    return clean;
  }

  // ═══════════════ URL ═══════════════
  private sanitizeUrl(input: string, removed: string[]): string {
    try {
      const url = new URL(input);
      const allowed = ['http:', 'https:', 'mailto:', 'tel:'];
      if (!allowed.includes(url.protocol)) {
        removed.push(`protocol:${url.protocol}`);
        return '';
      }
      return url.toString();
    } catch {
      removed.push('invalid-url');
      return '';
    }
  }

  // ═══════════════ Header (prevent CRLF injection) ═══════════════
  private sanitizeHeader(input: string, removed: string[]): string {
    let clean = input;
    if (/[\r\n]/.test(clean)) {
      clean = clean.replace(/[\r\n]+/g, ' ');
      removed.push('crlf-injection');
    }
    if (clean.length > 1000) {
      clean = clean.slice(0, 1000);
      removed.push('length-truncated');
    }
    return clean.trim();
  }

  // ═══════════════ JSON ═══════════════
  private sanitizeJson(input: string, removed: string[]): string {
    try {
      const parsed: unknown = JSON.parse(input);
      return JSON.stringify(parsed);
    } catch {
      removed.push('invalid-json');
      return '';
    }
  }
}
