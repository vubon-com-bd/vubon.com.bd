import type { VendorEntity } from '../../../domain/entities/vendor.entity';
import type { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

export interface VendorServiceInterface {
  findById(id: VendorIdVO): Promise<VendorEntity>;
  save(vendor: VendorEntity): Promise<void>;
  toDto(vendor: VendorEntity): VendorResponseDto;
}
