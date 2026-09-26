import { Injectable } from '@nestjs/common';
import { ContentFilteredError } from '../../../application/errors/prompt.errors';

@Injectable()
export class ContentFilterService {
  private readonly blockedPatterns: readonly RegExp[] = [
    /\b(?:violence|weapon|harm)\b/i,
  ];

  check(text: string): void {
    for (const pattern of this.blockedPatterns) {
      if (pattern.test(text)) {
        throw new ContentFilteredError(`blocked pattern matched: ${pattern.source}`);
      }
    }
  }

  isSafe(text: string): boolean {
    try {
      this.check(text);
      return true;
    } catch {
      return false;
    }
  }
}
