import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PaymentMethodEntity } from '../../../domain/entities/payment-method.entity';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';

export interface PaymentMethodServiceInterface
  extends BaseServiceInterface<PaymentMethodEntity, string> {
  listByUser(userId: string): Promise<readonly MethodResponseDTO[]>;
  findDefault(userId: string): Promise<MethodResponseDTO | null>;
  add(userId: string, input: unknown): Promise<MethodResponseDTO>;
  setDefault(userId: string, methodId: string): Promise<MethodResponseDTO>;
  remove(methodId: string): Promise<void>;
}
