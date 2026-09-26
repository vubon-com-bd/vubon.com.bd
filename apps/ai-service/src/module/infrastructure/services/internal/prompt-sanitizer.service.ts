import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptSanitizerService {
  sanitize(text: string): string {
    return text
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/javascript:/gi, '')
      .trim();
  }

  detectInjection(text: string): boolean {
    const patterns = [
      /ignore previous instructions/i,
      /you are now/i,
      /system prompt/i,
      /forget everything/i,
    ];
    return patterns.some((p) => p.test(text));
  }

  truncate(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars - 3) + '...';
  }
}
