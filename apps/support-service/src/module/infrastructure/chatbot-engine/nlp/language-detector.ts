import { Injectable } from '@nestjs/common';

export type Language = 'bn' | 'en' | 'unknown';

@Injectable()
export class LanguageDetector {
  detect(text: string): Language {
    const bengaliChars = text.match(/[\u0980-\u09FF]/g)?.length ?? 0;
    const englishChars = text.match(/[a-zA-Z]/g)?.length ?? 0;

    if (bengaliChars > englishChars) return 'bn';
    if (englishChars > 0) return 'en';
    return 'unknown';
  }
}
