import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IZoneService, ZoneListOptionsDTO } from '../interfaces/zone.service.interface.js';
import { ZONE_REPOSITORY, type ZoneRepository } from '../../../domain/repositories/zone.repository.interface.js';
import { ZoneEntity } from '../../../domain/entities/zone.entity.js';
import { ZoneIdVO } from '../../../domain/value-objects/primitives/zone-id.vo.js';
import { ZoneTypeVO } from '../../../domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '../../../domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { ZoneMapper } from '../../mappers/zone.mapper.js';
import { ZoneNotFoundApplicationError, ZoneOperationFailedApplicationError } from '../../errors/zone.errors.js';
import type {
  CreateZoneRequestDTO, UpdateZoneRequestDTO, ActivateZoneRequestDTO,
  InactivateZoneRequestDTO, SuspendZoneRequestDTO,
} from '../../dtos/requests/zone/zone.dto.js';
import type { ZoneResponseDTO, ZoneListResponseDTO } from '../../dtos/responses/zone/zone-response.dto.js';

@Injectable()
export class ZoneService implements IZoneService {
  private readonly logger = new Logger(ZoneService.name);
  constructor(@Inject(ZONE_REPOSITORY) private readonly repo: ZoneRepository) {}

  async create(dto: CreateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO> {
    const now = new Date().toISOString();
    if (await this.repo.existsByCode(dto.code)) {
      throw new ZoneOperationFailedApplicationError('create', `zone code exists: ${dto.code}`);
    }
    const id = randomUUID();
    let e: ZoneEntity;
    try {
      e = ZoneEntity.create({ id, now, props: {
        name: dto.name, code: dto.code,
        type: ZoneTypeVO.create(dto.type),
        pricingType: ZonePricingTypeVO.create(dto.pricingType),
        parentId: dto.parentId ? ZoneIdVO.create(dto.parentId) : undefined,
        postalCodes: dto.postalCodes ?? [], districts: dto.districts ?? [], divisions: dto.divisions ?? [],
        shippingCost: ShippingCostVO.create(dto.shippingCost, dto.currency),
        minDeliveryDays: dto.minDeliveryDays, maxDeliveryDays: dto.maxDeliveryDays,
        codEnabled: dto.codEnabled, codCharge: dto.codCharge, codMaxAmount: dto.codMaxAmount,
        isRemote: dto.isRemote ?? false,
      }});
    } catch (err) {
      throw new ZoneOperationFailedApplicationError('create', err instanceof Error ? err.message : 'unknown');
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Zone ${saved.id} created by ${actorId ?? 'system'}`);
    return ZoneMapper.toResponse(saved);
  }

  async update(dto: UpdateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO> {
    const e = await this.load(dto.zoneId);
    if (dto.shippingCost !== undefined && dto.currency) {
      e.updateShippingCost(ShippingCostVO.create(dto.shippingCost, dto.currency));
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Zone ${saved.id} updated by ${actorId ?? 'system'}`);
    return ZoneMapper.toResponse(saved);
  }

  async activate(dto: ActivateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO> {
    const e = await this.load(dto.zoneId); e.activate();
    const saved = await this.repo.save(e);
    this.logger.log(`Zone ${saved.id} activated by ${actorId ?? 'system'}`);
    return ZoneMapper.toResponse(saved);
  }

  async inactivate(dto: InactivateZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO> {
    const e = await this.load(dto.zoneId); e.inactivate(dto.reason);
    const saved = await this.repo.save(e);
    this.logger.log(`Zone ${saved.id} inactivated by ${actorId ?? 'system'}`);
    return ZoneMapper.toResponse(saved);
  }

  async suspend(dto: SuspendZoneRequestDTO, actorId?: string): Promise<ZoneResponseDTO> {
    const e = await this.load(dto.zoneId); e.suspend(dto.reason);
    const saved = await this.repo.save(e);
    this.logger.warn(`Zone ${saved.id} suspended by ${actorId ?? 'system'}: ${dto.reason}`);
    return ZoneMapper.toResponse(saved);
  }

  async getById(zoneId: string): Promise<ZoneResponseDTO> {
    return ZoneMapper.toResponse(await this.load(zoneId));
  }

  async findByAddress(input: { postalCode?: string; district?: string; division?: string }): Promise<ZoneResponseDTO | null> {
    const z = await this.repo.findForAddress(input);
    return z ? ZoneMapper.toResponse(z) : null;
  }

  async list(options: ZoneListOptionsDTO): Promise<ZoneListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return ZoneMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<ZoneEntity> {
    const vo = ZoneIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new ZoneNotFoundApplicationError(id);
    return e;
  }
}
