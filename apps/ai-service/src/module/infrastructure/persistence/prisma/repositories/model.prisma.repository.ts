import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiModel as PrismaModel } from '@prisma/client';
import { ModelEntity } from '../../../../domain/entities/model.entity';
import type { ModelRepository } from '../../../../domain/repositories/model.repository.interface';
import { ModelIdVO } from '../../../../domain/value-objects/primitives/model-id.vo';
import { ModelNameVO } from '../../../../domain/value-objects/primitives/model-name.vo';
import { ModelVersionVO } from '../../../../domain/value-objects/primitives/model-version.vo';
import { ModelStatusVO } from '../../../../domain/value-objects/primitives/model-status.vo';
import { ModelTypeVO } from '../../../../domain/value-objects/primitives/model-type.vo';
import { ModelProviderIdVO } from '../../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderEndpointVO } from '../../../../domain/value-objects/primitives/provider-endpoint.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ModelPrismaRepository
  extends BasePrismaRepository<ModelEntity, ModelIdVO>
  implements ModelRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaModel): ModelEntity {
    return ModelEntity.reconstitute(
      ModelIdVO.create(raw.id),
      {
        name: ModelNameVO.create(raw.name),
        modelVersion: ModelVersionVO.create(raw.version),
        status: ModelStatusVO.create(raw.status),
        type: ModelTypeVO.create(raw.type),
        providerId: ModelProviderIdVO.create(raw.providerId),
        endpoint: raw.endpoint ? ProviderEndpointVO.create(raw.endpoint) : null,
        description: raw.description,
        metadata: null,
        metrics: null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ModelIdVO): Promise<ModelEntity | null> {
    const raw = await this.prisma.aiModel.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ModelEntity[]> {
    const rows = await this.prisma.aiModel.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ModelEntity): Promise<ModelEntity> {
    const data = {
      name: entity.name.value,
      version: entity.modelVersion.value,
      status: entity.status.value,
      type: entity.type.value,
      providerId: entity.providerId.value,
      endpoint: entity.endpoint?.value ?? null,
      description: entity.description,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiModel.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ModelIdVO): Promise<void> {
    await this.prisma.aiModel.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByName(name: ModelNameVO): Promise<ModelEntity | null> {
    const raw = await this.prisma.aiModel.findFirst({
      where: { name: name.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByProvider(providerId: ModelProviderIdVO): Promise<readonly ModelEntity[]> {
    const rows = await this.prisma.aiModel.findMany({
      where: { providerId: providerId.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDeployed(): Promise<readonly ModelEntity[]> {
    const rows = await this.prisma.aiModel.findMany({
      where: { status: 'deployed', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly ModelEntity[]> {
    const rows = await this.prisma.aiModel.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: string): Promise<readonly ModelEntity[]> {
    const rows = await this.prisma.aiModel.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
