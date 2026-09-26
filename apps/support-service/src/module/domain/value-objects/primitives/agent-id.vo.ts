/**
 * AgentIdVO — Support agent identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'agent_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class AgentIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AgentIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AgentId must be a string', 'agentId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `AgentId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'agentId',
      );
    }
    return new AgentIdVO(trimmed);
  }

  static fromUserId(userId: string): AgentIdVO {
    if (!userId || userId.trim().length === 0) {
      throw new ValidationError('AgentId userId required', 'agentId');
    }
    return AgentIdVO.create(`${PREFIX}${userId.trim()}`);
  }
}
