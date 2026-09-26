import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CourierEntity } from '../entities/courier.entity';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo';
import { CourierNameVO } from '../value-objects/primitives/courier-name.vo';

export interface CourierRepository
  extends BaseRepository<CourierEntity, CourierIdVO> {
  findByName(name: CourierNameVO): Promise<CourierEntity | null>;
  findActive(): Promise<readonly CourierEntity[]>;
  findByType(type: string): Promise<readonly CourierEntity[]>;
}
