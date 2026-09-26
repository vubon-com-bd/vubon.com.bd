import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ZoneEntity } from '../../../domain/entities/zone.entity';
import type { CreateZoneRequestDTO } from '../../dtos/requests/zone/create-zone.dto';
import type { UpdateZoneRequestDTO } from '../../dtos/requests/zone/update-zone.dto';
import type { ZoneResponseDTO } from '../../dtos/responses/zone-response.dto';

export interface ZoneServiceInterface
  extends BaseServiceInterface<ZoneEntity, string> {
  create(input: CreateZoneRequestDTO): Promise<ZoneResponseDTO>;
  update(input: UpdateZoneRequestDTO): Promise<ZoneResponseDTO>;
  findByCode(code: string): Promise<ZoneResponseDTO | null>;
}
