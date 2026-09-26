import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { PackagingEntity } from '../../../domain/entities/packaging.entity';
import type { CreatePackagingRequestDTO } from '../../dtos/requests/packaging/create-packaging.dto';
import type { SelectPackagingRequestDTO } from '../../dtos/requests/packaging/select-packaging.dto';

export interface PackagingServiceInterface
  extends BaseServiceInterface<PackagingEntity, string> {
  create(input: CreatePackagingRequestDTO): Promise<PackagingEntity>;
  select(input: SelectPackagingRequestDTO): Promise<PackagingEntity | null>;
}
