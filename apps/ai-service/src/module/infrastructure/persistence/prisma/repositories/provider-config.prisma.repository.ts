import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiProviderConfig as PrismaConfig } from '@prisma/client';
import { ProviderConfigEntity } from '../../../../domain/entities/provider-config.entity';
import type { ProviderConfigRepository } from '../../../../domain/repositories/provider-config.repository.interface';
import { ModelProviderIdVO } from '../../../../domain/value-objects/primitives/model-provider-id.vo';
import { ProviderConfigVO } from '../../../../domain/value-objects/composites/provider-config.vo';
import { ProviderEndpointVO } from '../../../../domain/value-objects/primitives/provider-endpoint.vo';
import { ProviderApiKeyRefVO } from '../../../../domain/value-objects/primitives/provider-api-key-ref.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProviderConfigPrismaRepository
  extends BasePrismaRepository<ProviderConfigEntity, ModelProviderIdVO>
  implements ProviderConfigRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaConfig): ProviderConfigEntity {
    return ProviderConfigEntity.reconstitute(
      ModelProviderIdVO.create(raw.providerId),
      {
        providerId: ModelProviderIdVO.create(raw.providerId),
        config: ProviderConfigVO.create({
          endpoint: ProviderEndpointVO.create(raw.endpoint),
          apiKeyRef: raw.apiKeyRef ? ProviderApiKeyRefVO.create(raw.apiKeyRef) : null,
          timeoutMs: raw.timeoutMs,
          maxRetries: raw.maxRetries,
          enabled: raw.enabled,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ModelProviderIdVO): Promise<ProviderConfigEntity | null> {
    const raw = await this.prisma.aiProviderConfig.findUnique({ where: { providerId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProviderConfigEntity[]> {
    const rows = await this.prisma.aiProviderConfig.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProviderConfigEntity): Promise<ProviderConfigEntity> {
    const data = {
      endpoint: entity.config.endpoint.value,
      apiKeyRef: entity.config.apiKeyRef?.value ?? null,
      timeoutMs: entity.config.timeoutMs,
      maxRetries: entity.config.maxRetries,
      enabled: entity.config.enabled,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiProviderConfig.upsert({
      where: { providerId: entity.providerId.value },
      create: { id: entity.id.value, providerId: entity.providerId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ModelProviderIdVO): Promise<void> {
    await this.prisma.aiProviderConfig.update({
      where: { providerId: id.value },
      data: { deletedAt: new Date() },
    });
  }

  async findByProviderId(providerId: ModelProviderIdVO): Promise<ProviderConfigEntity | null> {
    const raw = await this.prisma.aiProviderConfig.findUnique({
      where: { providerId: providerId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAllEnabled(): Promise<readonly ProviderConfigEntity[]> {
    const rows = await this.prisma.aiProviderConfig.findMany({ where: { enabled: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
