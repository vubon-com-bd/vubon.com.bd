import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { InsuranceServiceInterface } from '../interfaces/insurance.service.interface';
import type { InsuranceRepository } from '../../../domain/repositories/insurance.repository.interface';
import { InsuranceEntity } from '../../../domain/entities/insurance.entity';
import { InsuranceIdVO } from '../../../domain/value-objects/primitives/insurance-id.vo';
import { InsuranceStatusVO } from '../../../domain/value-objects/primitives/insurance-status.vo';
import { InsuranceCoverageVO } from '../../../domain/value-objects/primitives/insurance-coverage.vo';
import { InsuranceProviderVO } from '../../../domain/value-objects/primitives/insurance-provider.vo';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import type { PurchaseInsuranceRequestDTO } from '../../dtos/requests/insurance/purchase-insurance.dto';
import type { ClaimInsuranceRequestDTO } from '../../dtos/requests/insurance/claim-insurance.dto';
import type { SettleInsuranceRequestDTO } from '../../dtos/requests/insurance/settle-insurance.dto';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@Injectable()
export class InsuranceService
  extends BaseService<InsuranceEntity, string>
  implements InsuranceServiceInterface
{
  readonly name = 'InsuranceService';

  constructor(private readonly repo: InsuranceRepository) {
    super();
  }

  async purchase(input: PurchaseInsuranceRequestDTO): Promise<InsuranceResponseDTO> {
    const entity = InsuranceEntity.create({
      shipmentId: ShipmentIdVO.create(input.shipmentId),
      provider: InsuranceProviderVO.create(input.provider),
      coverage: InsuranceCoverageVO.create(input.coverage),
      premium: input.declaredValue * 0.02,
      currency: input.currency,
      status: InsuranceStatusVO.create('active'),
      purchasedAt: new Date(),
      claimedAt: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async claim(input: ClaimInsuranceRequestDTO): Promise<InsuranceResponseDTO> {
    const entity = await this.repo.findById(InsuranceIdVO.create(input.insuranceId));
    if (!entity) throw new Error('Insurance not found');
    const updated = entity.claim(input.amount);
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  async settle(input: SettleInsuranceRequestDTO): Promise<InsuranceResponseDTO> {
    const entity = await this.repo.findById(InsuranceIdVO.create(input.insuranceId));
    if (!entity) throw new Error('Insurance not found');
    return this.toDTO(entity);
  }

  private toDTO(entity: InsuranceEntity): InsuranceResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as InsuranceResponseDTO;
  }
}
