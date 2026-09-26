import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ClusterResultServiceInterface } from '../interfaces/cluster-result.service.interface';
import type { ClusterResultRepository } from '../../../domain/repositories/cluster-result.repository.interface';
import { ClusterResultEntity } from '../../../domain/entities/cluster-result.entity';
import { ClusterIdVO } from '../../../domain/value-objects/primitives/cluster-id.vo';

@Injectable()
export class ClusterResultService
  extends BaseService<ClusterResultEntity, ClusterIdVO>
  implements ClusterResultServiceInterface
{
  readonly name = 'ClusterResultService';

  constructor(private readonly resultRepo: ClusterResultRepository) {
    super();
  }

  async findByClusterId(clusterId: string): Promise<ClusterResultEntity | null> {
    return this.resultRepo.findByClusterId(ClusterIdVO.create(clusterId));
  }
}
