/**
 * TeamMemberStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_TEAM_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_TEAM_STATUS) as readonly string[];

export class TeamMemberStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamMemberStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid member status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new TeamMemberStatusVO(raw);
  }

  static active(): TeamMemberStatusVO { return new TeamMemberStatusVO(VENDOR_TEAM_STATUS.ACTIVE); }
  static inactive(): TeamMemberStatusVO { return new TeamMemberStatusVO(VENDOR_TEAM_STATUS.INACTIVE); }
  static invited(): TeamMemberStatusVO { return new TeamMemberStatusVO(VENDOR_TEAM_STATUS.INVITED); }
  static suspended(): TeamMemberStatusVO { return new TeamMemberStatusVO(VENDOR_TEAM_STATUS.SUSPENDED); }
  static removed(): TeamMemberStatusVO { return new TeamMemberStatusVO(VENDOR_TEAM_STATUS.REMOVED); }

  static reconstitute(raw: string): TeamMemberStatusVO {
    return new TeamMemberStatusVO(raw);
  }

  isActive(): boolean { return this.value === VENDOR_TEAM_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === VENDOR_TEAM_STATUS.INACTIVE; }
  isInvited(): boolean { return this.value === VENDOR_TEAM_STATUS.INVITED; }
  isSuspended(): boolean { return this.value === VENDOR_TEAM_STATUS.SUSPENDED; }
  isRemoved(): boolean { return this.value === VENDOR_TEAM_STATUS.REMOVED; }

  /** Can this member access the vendor dashboard? */
  canLogin(): boolean {
    return this.value === VENDOR_TEAM_STATUS.ACTIVE;
  }

  isTerminal(): boolean {
    return this.value === VENDOR_TEAM_STATUS.REMOVED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_TEAM_STATUS.INVITED]: [
        VENDOR_TEAM_STATUS.ACTIVE,
        VENDOR_TEAM_STATUS.REMOVED,
      ],
      [VENDOR_TEAM_STATUS.ACTIVE]: [
        VENDOR_TEAM_STATUS.INACTIVE,
        VENDOR_TEAM_STATUS.SUSPENDED,
        VENDOR_TEAM_STATUS.REMOVED,
      ],
      [VENDOR_TEAM_STATUS.INACTIVE]: [
        VENDOR_TEAM_STATUS.ACTIVE,
        VENDOR_TEAM_STATUS.REMOVED,
      ],
      [VENDOR_TEAM_STATUS.SUSPENDED]: [
        VENDOR_TEAM_STATUS.ACTIVE,
        VENDOR_TEAM_STATUS.REMOVED,
      ],
      [VENDOR_TEAM_STATUS.REMOVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
