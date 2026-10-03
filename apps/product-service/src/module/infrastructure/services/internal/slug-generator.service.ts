/**
 * SlugGeneratorService — infra adapter for slug generation.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { SlugGeneratorService as DomainSlugGenerator } from '../../../domain/services/slug-generator.service.js';
import type { SlugUniquenessChecker } from '../../../domain/services/slug-generator.service.js';

export const SLUG_GENERATOR_SERVICE = Symbol('SLUG_GENERATOR_SERVICE');

@Injectable()
export class SlugGeneratorService extends DomainSlugGenerator {
  private readonly logger = new Logger(SlugGeneratorService.name);

  constructor() {
    super();
  }

  async generate(productName: string, checker?: SlugUniquenessChecker): Promise<string> {
    if (checker) {
      try {
        return await this.generateUniqueSlug(productName, checker);
      } catch (err) {
        this.logger.warn(`Slug fallback: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    return this.toSlug(productName);
  }
}
