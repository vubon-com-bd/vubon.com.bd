/**
 * Vendor Feature Health Indicator
 * @module vendor-service/modules/vendor/health
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { Inject } from '@nestjs/common';

export interface VendorFeatureHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class VendorFeatureHealthIndicator {
  private readonly logger = new Logger(VendorFeatureHealthIndicator.name);

  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
  ) {}

  async check(): Promise<VendorFeatureHealthReport> {
    try {
      const rows = await this.repo.findAll();
      return {
        name: 'vendor-repository',
        healthy: true,
        message: `${rows.length} records`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Vendor feature health failed: ${msg}`);
      return { name: 'vendor-repository', healthy: false, message: msg };
    }
  }
}
