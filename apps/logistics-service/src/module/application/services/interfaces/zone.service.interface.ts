import type {
  ZoneResponseDTO,
  ZoneListResponseDTO,
  ZoneStatsResponseDTO,
} from '@application/dtos/responses/zone/index.js';
import type {
  CreateZoneRequestDTO,
  UpdateZoneRequestDTO,
  ZoneActionRequestDTO,
  DeactivateZoneRequestDTO,
  RestrictZoneRequestDTO,
  SuspendZoneRequestDTO,
  ClassifyPostalCodeRequestDTO,
} from '@application/dtos/requests/zone/index.js';
import type { ZoneStatusValue } from '@domain/primitives/zone-status.vo';

export const ZONE_SERVICE = Symbol('ZONE_SERVICE');

export interface ZoneListFilterDTO {
  readonly status?: ZoneStatusValue;
  readonly type?: string;
  readonly pricingType?: string;
  readonly parentId?: string;
  readonly codEnabled?: boolean;
  readonly isRemote?: boolean;
  readonly search?: string;
}
export interface ZoneListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'shippingCost';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ZoneListFilterDTO;
}

export interface IZoneService {
  create(dto: CreateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  update(dto: UpdateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  activate(dto: ZoneActionRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  deactivate(dto: DeactivateZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  restrict(dto: RestrictZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  suspend(dto: SuspendZoneRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  archive(dto: ZoneActionRequestDTO, actorId: string): Promise<ZoneResponseDTO>;
  updatePricing(
    dto: { zoneId: string; shippingCost?: number; freeAbove?: number; codEnabled?: boolean; codCharge?: number; codMaxAmount?: number },
    actorId: string,
  ): Promise<ZoneResponseDTO>;
  updateCoverage(
    dto: { zoneId: string; postalCodes?: readonly string[]; districts?: readonly string[]; divisions?: readonly string[] },
    actorId: string,
  ): Promise<ZoneResponseDTO>;

  getById(id: string): Promise<ZoneResponseDTO>;
  getByCode(code: string): Promise<ZoneResponseDTO>;
  list(options: ZoneListOptionsDTO): Promise<ZoneListResponseDTO>;
  listActive(): Promise<ZoneListResponseDTO>;
  listByParent(parentId: string): Promise<ZoneListResponseDTO>;
  classify(dto: ClassifyPostalCodeRequestDTO): Promise<ZoneResponseDTO | null>;
  getStats(): Promise<ZoneStatsResponseDTO>;
}
