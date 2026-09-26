import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugGeneratorService {
  generate(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  withSuffix(base: string, suffix: number): string {
    return `${base}-${suffix}`;
  }
}
