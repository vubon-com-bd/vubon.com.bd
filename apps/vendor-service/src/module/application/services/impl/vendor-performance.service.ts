import { Injectable } from '@nestjs/common';
import { VendorPerformanceEntity } from '../../../domain/entities/vendor-performance.entity';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorPerformanceRepository } from '../../../domain/repositories/vendor-performance.repository.interface';

@Injectable()
export class VendorPerformanceService {
  constructor(private readonly repo: VendorPerformanceRepository) {}

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorPerformanceEntity | null> {
    return this.repo.findByVendorId(vendorId);
  }

  async save(performance: VendorPerformanceEntity): Promise<void> {
    await this.repo.save(performance);
  }
}
