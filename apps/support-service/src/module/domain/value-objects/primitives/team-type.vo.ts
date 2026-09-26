/**
 * TeamTypeVO — Support team classification
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_TEAM_TYPE } from '@vubon/shared-constants/support';

export type TeamTypeValue =
  (typeof SUPPORT_TEAM_TYPE)[keyof typeof SUPPORT_TEAM_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_TEAM_TYPE),
);

const SPECIALIZED: ReadonlySet<string> = new Set<string>([
  'technical',
  'billing',
  'compliance',
]);

export class TeamTypeVO extends BaseTypeVO<TeamTypeValue> {
  private constructor(value: TeamTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): TeamTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid team type: ${raw}`,
        'teamType',
      );
    }
    return new TeamTypeVO(normalized as TeamTypeValue);
  }

  isSpecialized(): boolean {
    return SPECIALIZED.has(this.value);
  }
}
