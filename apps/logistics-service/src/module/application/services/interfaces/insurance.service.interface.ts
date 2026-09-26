import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { InsuranceEntity } from '../../../domain/entities/insurance.entity';
import type { PurchaseInsuranceRequestDTO } from '../../dtos/requests/insurance/purchase-insurance.dto';
import type { ClaimInsuranceRequestDTO } from '../../dtos/requests/insurance/claim-insurance.dto';
import type { SettleInsuranceRequestDTO } from '../../dtos/requests/insurance/settle-insurance.dto';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

export interface InsuranceServiceInterface
  extends BaseServiceInterface<InsuranceEntity, string> {
  purchase(input: PurchaseInsuranceRequestDTO): Promise<InsuranceResponseDTO>;
  claim(input: ClaimInsuranceRequestDTO): Promise<InsuranceResponseDTO>;
  settle(input: SettleInsuranceRequestDTO): Promise<InsuranceResponseDTO>;
}
