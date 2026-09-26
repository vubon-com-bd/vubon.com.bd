import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentSanitizerService {
  sanitizeHtml(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
      .replace(/on\w+\s*=\s*'[^']*'/gi, '');
  }

  sanitizeText(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
