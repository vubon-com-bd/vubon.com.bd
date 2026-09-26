import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiTrainingConfig as PrismaConfig } from '@prisma/client';
import { TrainingConfigEntity } from '../../../../domain/entities/training-config.entity';
import type { TrainingConfigRepository } from '../../../../domain/repositories/training-config.repository.interface';
import { TrainingIdVO } from '../../../../domain/value-objects/primitives/training-id.vo';
import { TrainingConfigVO } from '../../../../domain/value-objects/composites/training-config.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrainingConfigPrismaRepository
  extends BasePrismaRepository<TrainingConfigEntity, TrainingIdVO>
  implements TrainingConfigRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaConfig): TrainingConfigEntity {
    return TrainingConfigEntity.reconstitute(
      TrainingIdVO.create(raw.trainingId),
      {
        trainingId: TrainingIdVO.create(raw.trainingId),
        config: TrainingConfigVO.create({
          datasetId: raw.datasetId,
          epochs: raw.epochs,
          batchSize: raw.batchSize,
          learningRate: raw.learningRate,
          validationSplit: raw.validationSplit,
          hyperparameters: raw.hyperparameters as Record<string, string | number | boolean>,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TrainingIdVO): Promise<TrainingConfigEntity | null> {
    const raw = await this.prisma.aiTrainingConfig.findUnique({ where: { trainingId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrainingConfigEntity[]> {
    const rows = await this.prisma.aiTrainingConfig.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TrainingConfigEntity): Promise<TrainingConfigEntity> {
    const data = {
      datasetId: entity.config.datasetId,
      epochs: entity.config.epochs,
      batchSize: entity.config.batchSize,
      learningRate: entity.config.learningRate,
      validationSplit: entity.config.validationSplit,
      hyperparameters: entity.config.hyperparameters as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiTrainingConfig.upsert({
      where: { trainingId: entity.trainingId.value },
      create: { id: entity.id.value, trainingId: entity.trainingId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TrainingIdVO): Promise<void> {
    await this.prisma.aiTrainingConfig.delete({ where: { trainingId: id.value } });
  }

  async findByTrainingId(trainingId: TrainingIdVO): Promise<TrainingConfigEntity | null> {
    const raw = await this.prisma.aiTrainingConfig.findUnique({ where: { trainingId: trainingId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByDatasetId(datasetId: string): Promise<readonly TrainingConfigEntity[]> {
    const rows = await this.prisma.aiTrainingConfig.findMany({ where: { datasetId } });
    return rows.map((r) => this.toDomain(r));
  }
}
