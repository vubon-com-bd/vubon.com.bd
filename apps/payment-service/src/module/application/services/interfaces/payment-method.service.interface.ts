/**
 * IPaymentMethodService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  AddPaymentMethodRequestDTO,
  UpdatePaymentMethodRequestDTO,
  DeletePaymentMethodRequestDTO,
  SetDefaultMethodRequestDTO,
} from '@application/dtos/requests/method/index.js';
import type {
  MethodResponseDTO,
  MethodListResponseDTO,
} from '@application/dtos/responses/method-response.dto.js';

export const PAYMENT_METHOD_SERVICE = Symbol('PAYMENT_METHOD_SERVICE');

export interface MethodListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'label';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: {
    readonly isActive?: boolean;
    readonly type?: string;
  };
}

export interface IPaymentMethodService {
  add(dto: AddPaymentMethodRequestDTO, userId: string): Promise<MethodResponseDTO>;
  update(dto: UpdatePaymentMethodRequestDTO, userId: string): Promise<MethodResponseDTO>;
  remove(dto: DeletePaymentMethodRequestDTO, userId: string): Promise<void>;
  setDefault(dto: SetDefaultMethodRequestDTO, userId: string): Promise<MethodResponseDTO>;

  getById(id: string): Promise<MethodResponseDTO>;
  listByUser(userId: string, options: MethodListOptionsDTO): Promise<MethodListResponseDTO>;
}
