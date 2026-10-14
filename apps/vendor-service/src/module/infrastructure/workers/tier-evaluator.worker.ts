/**
 * TierEvaluatorWorker — periodic tier upgrade evaluation
 * @module vendor-service/infrastructure/workers
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../domain/repositories/vendor.repository.interface.js';
import { VendorTierCalculatorService } from '../../domain/services/vendor-tier-calculator.service.js';

@Injectable()
export class TierEvaluatorWorker implements OnModuleInit {
  private readonly logger = new Logger(TierEvaluatorWorker.name);

  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepo: VendorRepository,
  ) {}

  onModuleInit(): void {
    this.logger.log('TierEvaluatorWorker registered');
  }

  async evaluateAll(): Promise<{ evaluated: number; upgraded: number }> {
    this.logger.debug('Evaluating tier upgrades for active vendors');
    const vendors = await this.vendorRepo.findByStatus('active');

    let upgraded = 0;
    for (const vendor of vendors) {
      const evaluation = VendorTierCalculatorService.evaluate({
        currentTier: vendor.tier,
        totalSales: vendor.vo.totalSales,
        totalOrders: vendor.vo.totalOrders,
        averageRating: vendor.vo.rating.rating,
        fulfillmentRate: 0.9,
        accountAgeDays: 365,
      });

      if (evaluation.shouldUpgrade) {
        vendor.upgradeTier(evaluation.eligibleTier, evaluation.reason, vendor.vo.totalSales);
        await this.vendorRepo.save(vendor);
        upgraded += 1;
      }
    }

    this.logger.log(`Tier evaluation done — evaluated=${vendors.length} upgraded=${upgraded}`);
    return { evaluated: vendors.length, upgraded };
  }
}
