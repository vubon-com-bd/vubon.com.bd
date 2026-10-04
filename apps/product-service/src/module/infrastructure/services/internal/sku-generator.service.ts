/**
 * SkuGeneratorService — infrastructure adapter for SKU generation.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { SkuGeneratorService as DomainSkuGenerator } from '../../../domain/services/sku-generator.service.js';
import type { SkuUniquenessChecker } from '../../../domain/services/sku-generator.service.js';

export const SKU_GENERATOR_SERVICE = Symbol('SKU_GENERATOR_SERVICE');

@Injectable()
export class SkuGeneratorService extends DomainSkuGenerator {
  private readonly logger = new Logger(SkuGeneratorService.name);

  constructor() {
    super();
  }

  /**
   * Deterministic short ID from random bytes for suffix.
   */
  randomSuffix(length = 4): string {
    return randomBytes(8)
      .toString('hex')
      .slice(0, length)
      .toUpperCase();
  }

  /**
   * Build SKU with timestamp-based sequence when checker is unavailable.
   */
  async quickGenerate(productName: string): Promise<string> {
    const prefix = productName.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 3).padEnd(3, 'X');
    const seq = Date.now().toString(36).toUpperCase().slice(-5);
    const suffix = this.randomSuffix(3);
    return `${prefix}-${seq}-${suffix}`;
  }

  async generateWithChecker(productName: string, checker: SkuUniquenessChecker): Promise<string> {
    try {
      return await this.generateProductSku(productName, Date.now() % 99999, checker);
    } catch (err) {
      this.logger.warn(`SKU generation fallback: ${err instanceof Error ? err.message : String(err)}`);
      return this.quickGenerate(productName);
    }
  }
}
