import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiProvider as PrismaProvider } from '@prisma/client';
import { ProviderEntity } from '../../../../domain/entities/provider.entity';
import type { ProviderRepository } from '../../../../domain/repositories/provider.repository.interface';
import { ModelProviderIdVO } from '../../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderNameVO } from '../../../../domain/value-objects/primitives/provider-name.vo';
import { ProviderConfigVO } from '../../../../domain/value-objects/composites/provider-config.vo';
import { ProviderEndpointVO } from '../../../../domain/value-objects/primitives/provider-endpoint.vo';
import { ProviderApiKeyRefVO } from '../../../../domain/value-objects/primitives/provider-api-key-ref.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProviderPrismaRepository
  extends BasePrismaRepository<ProviderEntity, ModelProviderIdVO>
  implements ProviderRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaProvider & { config?: { endpoint: string; apiKeyRef: string | null; timeoutMs: number; maxRetries: number; enabled: boolean } | null }): ProviderEntity {
    const config = raw.config ?? {
      endpoint: 'https://api.example.com',
      apiKeyRef: null,
      timeoutMs: 30000,
      maxRetries: 3,
      enabled: true,
    };
    return ProviderEntity.reconstitute(
      ModelProviderIdVO.create(raw.id),
      {
        name: ProviderNameVO.create(raw.name),
        status: raw.status,
        config: ProviderConfigVO.create({
          endpoint: ProviderEndpointVO.create(config.endpoint),
          apiKeyRef: config.apiKeyRef ? ProviderApiKeyRefVO.create(config.apiKeyRef) : null,
          timeoutMs: config.timeoutMs,
          maxRetries: config.maxRetries,
          enabled: config.enabled,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ModelProviderIdVO): Promise<ProviderEntity | null> {
    const raw = await this.prisma.aiProvider.findUnique({
      where: { id: id.value },
      include: { config: true },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProviderEntity[]> {
    const rows = await this.prisma.aiProvider.findMany({
      where: { deletedAt: null },
      include: { config: true },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProviderEntity): Promise<ProviderEntity> {
    const raw = await this.prisma.aiProvider.upsert({
      where: { id: entity.id.value },
      create: {
        id: entity.id.value,
        name: entity.name.value,
        status: entity.status,
      },
      update: {
        name: entity.name.value,
        status: entity.status,
        updatedAt: new Date(),
      },
      include: { config: true },
    });
    return this.toDomain(raw);
  }

  async delete(id: ModelProviderIdVO): Promise<void> {
    await this.prisma.aiProvider.update({
      where: { id: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByName(name: ProviderNameVO): Promise<ProviderEntity | null> {
    const raw = await this.prisma.aiProvider.findFirst({
      where: { name: name.value, deletedAt: null },
      include: { config: true },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllActive(): Promise<readonly ProviderEntity[]> {
    const rows = await this.prisma.aiProvider.findMany({
      where: { status: 'active', deletedAt: null },
      include: { config: true },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findAvailable(): Promise<readonly ProviderEntity[]> {
    const rows = await this.prisma.aiProvider.findMany({
      where: { status: 'active', deletedAt: null, config: { enabled: true } },
      include: { config: true },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
