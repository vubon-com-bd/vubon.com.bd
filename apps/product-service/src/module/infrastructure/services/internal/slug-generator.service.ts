import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugGeneratorService {
  generate(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  generateWithSuffix(input: string, suffix: string): string {
    return `${this.generate(input)}-${suffix}`;
  }
}
