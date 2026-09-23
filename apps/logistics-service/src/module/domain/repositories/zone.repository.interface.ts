import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ZoneEntity } from '../entities/zone.entity';
import { ZoneIdVO } from '../value-objects/primitives/zone-id.vo';

export interface ZoneRepository
  extends BaseRepository<ZoneEntity, ZoneIdVO> {
  findByType(type: string): Promise<readonly ZoneEntity[]>;
  findByCode(code: string): Promise<ZoneEntity | null>;
}
