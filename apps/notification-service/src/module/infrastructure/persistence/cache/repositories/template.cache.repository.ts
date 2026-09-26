import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { TemplateEntity } from '../../../../domain/entities/template.entity';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import { TemplateNameVO } from '../../../../domain/value-objects/primitives/template-name.vo';
import { TemplateContentVO } from '../../../../domain/value-objects/primitives/template-content.vo';
import { TemplateFormatVO } from '../../../../domain/value-objects/primitives/template-format.vo';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo';

interface SerializedTemplate {
  readonly id: string;
  readonly name: string;
  readonly channel: string;
  readonly language: string;
  readonly subject: string | null;
  readonly content: string;
  readonly format: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'notif:template';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class TemplateCacheRepository extends BaseCacheRepository<TemplateEntity, TemplateIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: TemplateEntity): SerializedTemplate {
    return {
      id: entity.id.value,
      name: entity.name.value,
      channel: entity.channel.value,
      language: entity.language,
      subject: entity.subject,
      content: entity.content.value,
      format: entity.format.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedTemplate): TemplateEntity {
    return TemplateEntity.reconstitute(
      TemplateIdVO.create(data.id),
      {
        name: TemplateNameVO.create(data.name),
        channel: NotificationChannelVO.create(data.channel),
        language: data.language,
        subject: data.subject,
        content: TemplateContentVO.create(data.content),
        format: TemplateFormatVO.create(data.format),
        variables: [],
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: TemplateIdVO): Promise<TemplateEntity | null> {
    const raw = await this.redis.get<SerializedTemplate>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly TemplateEntity[]> {
    return [];
  }

  async save(entity: TemplateEntity): Promise<TemplateEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: TemplateIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
