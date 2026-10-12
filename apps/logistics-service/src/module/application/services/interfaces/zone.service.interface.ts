import type {
  CreateZoneRequestDTO, UpdateZoneRequestDTO, ActivateZoneRequestDTO,
  InactivateZoneRequestDTO, SuspendZoneRequestDTO, ZoneListFilterDTO,
} from '../../dtos/requests/zone/zone.dto.js';
import type { ZoneResponseDTO, ZoneListResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';
export const ZONE_SERVICE = Symbol('ZONE_SERVICE');
export interface ZoneListOptionsDTO {
  readonly page: number; readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'shippingCost';
  readonly sortDir?: 'asc' | 'desc'; readonly filter?: ZoneListFilterDTO;
}
export interface IZoneService {
  create(dto: CreateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO>;
  update(dto: UpdateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO>;
  activate(dto: ActivateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO>;
  inactivate(dto: InactivateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO>;
  suspend(dto: SuspendZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO>;
  getById(zoneId: string): Promise<ZoneResponseDTO>;
  findByAddress(input: { postalCode?: string; district?: string; division?: string }): Promise<ZoneResponseDTO | null>;
  list(options: ZoneListOptionsDTO): Promise<ZoneListResponseDTO>;
}
