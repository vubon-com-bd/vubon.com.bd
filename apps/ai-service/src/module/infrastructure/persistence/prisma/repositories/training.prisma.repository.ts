import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiTraining as PrismaTraining } from '@prisma/client';
import { TrainingEntity } from '../../../../domain/entities/training.entity';
import type { TrainingRepository } from '../../../../domain/repositories/training.repository.interface';
import { TrainingIdVO } from '../../../../domain/value-objects/primitives/training-id.vo';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { TrainingConfigVO } from '../../../../domain/value-objects/composites/training-config.vo';
import { TrainingJobVO } from '../../../../domain/value-objects/composites/training-job.vo';
import { TrainingStatusVO } from '../../../../domain/value-objects/primitives/training-status.vo';
import { TrainingTypeVO } from '../../../../domain/value-objects/primitives/training-type.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrainingPrismaRepository
  extends BasePrismaRepository<TrainingEntity, TrainingIdVO>
  implements TrainingRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaTraining): TrainingEntity {
    return TrainingEntity.reconstitute(
      TrainingIdVO.create(raw.id),
      {
        modelId: ModelIdVO.create(raw.modelId),
        config: TrainingConfigVO.create({
          datasetId: '',
          epochs: 10,
          batchSize: 32,
          learningRate: 0.001,
          validationSplit: 0.2,
          hyperparameters: {},
        }),
        job: TrainingJobVO.create({
          id: TrainingIdVO.create(raw.id),
          type: TrainingTypeVO.create('supervised'),
          status: TrainingStatusVO.create(raw.status),
          progress: raw.progress,
          startedAt: raw.startedAt,
          completedAt: raw.completedAt,
          errorMessage: raw.errorMessage,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: TrainingIdVO): Promise<TrainingEntity | null> {
    const raw = await this.prisma.aiTraining.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrainingEntity[]> {
    const rows = await this.prisma.aiTraining.findMany({ where: { deletedAt: null } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TrainingEntity): Promise<TrainingEntity> {
    const data = {
      modelId: entity.modelId.value,
      status: entity.job.status.value,
      progress: entity.job.progress,
      startedAt: entity.job.startedAt,
      completedAt: entity.job.completedAt,
      errorMessage: entity.job.errorMessage,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiTraining.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TrainingIdVO): Promise<void> {
    await this.prisma.aiTraining.update({ where: { id: id.value }, data: { deletedAt: new Date() } });
  }

  async findByModelId(modelId: ModelIdVO): Promise<readonly TrainingEntity[]> {
    const rows = await this.prisma.aiTraining.findMany({
      where: { modelId: modelId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRunning(): Promise<readonly TrainingEntity[]> {
    const rows = await this.prisma.aiTraining.findMany({
      where: { status: 'running', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(limit: number): Promise<readonly TrainingEntity[]> {
    const rows = await this.prisma.aiTraining.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
