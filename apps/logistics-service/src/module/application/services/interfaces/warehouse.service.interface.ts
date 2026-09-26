import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { WarehouseEntity } from '../../../domain/entities/warehouse.entity';
import type { CreateWarehouseRequestDTO } from '../../dtos/requests/warehouse/create-warehouse.dto';
import type { UpdateWarehouseRequestDTO } from '../../dtos/requests/warehouse/update-warehouse.dto';
import type { AddLocationRequestDTO } from '../../dtos/requests/warehouse/add-location.dto';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse-response.dto';

export interface WarehouseServiceInterface
  extends BaseServiceInterface<WarehouseEntity, string> {
  create(input: CreateWarehouseRequestDTO): Promise<WarehouseResponseDTO>;
  update(input: UpdateWarehouseRequestDTO): Promise<WarehouseResponseDTO>;
  addLocation(input: AddLocationRequestDTO): Promise<WarehouseResponseDTO>;
  listActive(): Promise<readonly WarehouseResponseDTO[]>;
}
