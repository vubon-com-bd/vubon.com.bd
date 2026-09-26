import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CompletionEntity } from '../../../../domain/entities/completion.entity';
import { CompletionIdVO } from '../../../../domain/value-objects/primitives/completion-id.vo';
import { CompletionTextVO } from '../../../../domain/value-objects/primitives/completion-text.vo';
import { PromptIdVO } from '../../../../domain/value-objects/primitives/prompt-id.vo';

interface SerializedCompletion {
  readonly id: string;
  readonly promptId: string;
  readonly text: string;
  readonly tokensUsed: number;
  readonly model: string;
  readonly finishReason: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'ai:completion';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class CompletionCacheRepository extends BaseCacheRepository<CompletionEntity, CompletionIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CompletionEntity): SerializedCompletion {
    return {
      id: entity.id.value,
      promptId: entity.promptId.value,
      text: entity.text.value,
      tokensUsed: entity.tokensUsed,
      model: entity.model,
      finishReason: entity.finishReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedCompletion): CompletionEntity {
    return CompletionEntity.reconstitute(
      CompletionIdVO.create(data.id),
      {
        promptId: PromptIdVO.create(data.promptId),
        text: CompletionTextVO.create(data.text),
        tokensUsed: data.tokensUsed,
        model: data.model,
        finishReason: data.finishReason,
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: CompletionIdVO): Promise<CompletionEntity | null> {
    const raw = await this.redis.get<SerializedCompletion>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly CompletionEntity[]> {
    return [];
  }

  async save(entity: CompletionEntity): Promise<CompletionEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: CompletionIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
