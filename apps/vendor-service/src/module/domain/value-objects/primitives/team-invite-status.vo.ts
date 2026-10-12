/**
 * TeamInviteStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_TEAM_INVITE_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_TEAM_INVITE_STATUS) as readonly string[];

export class TeamInviteStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TeamInviteStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid invite status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new TeamInviteStatusVO(raw);
  }

  static pending(): TeamInviteStatusVO { return new TeamInviteStatusVO(VENDOR_TEAM_INVITE_STATUS.PENDING); }
  static accepted(): TeamInviteStatusVO { return new TeamInviteStatusVO(VENDOR_TEAM_INVITE_STATUS.ACCEPTED); }
  static rejected(): TeamInviteStatusVO { return new TeamInviteStatusVO(VENDOR_TEAM_INVITE_STATUS.REJECTED); }
  static expired(): TeamInviteStatusVO { return new TeamInviteStatusVO(VENDOR_TEAM_INVITE_STATUS.EXPIRED); }
  static cancelled(): TeamInviteStatusVO { return new TeamInviteStatusVO(VENDOR_TEAM_INVITE_STATUS.CANCELLED); }

  static reconstitute(raw: string): TeamInviteStatusVO {
    return new TeamInviteStatusVO(raw);
  }

  isPending(): boolean { return this.value === VENDOR_TEAM_INVITE_STATUS.PENDING; }
  isAccepted(): boolean { return this.value === VENDOR_TEAM_INVITE_STATUS.ACCEPTED; }
  isRejected(): boolean { return this.value === VENDOR_TEAM_INVITE_STATUS.REJECTED; }
  isExpired(): boolean { return this.value === VENDOR_TEAM_INVITE_STATUS.EXPIRED; }
  isCancelled(): boolean { return this.value === VENDOR_TEAM_INVITE_STATUS.CANCELLED; }

  isTerminal(): boolean {
    return [VENDOR_TEAM_INVITE_STATUS.ACCEPTED, VENDOR_TEAM_INVITE_STATUS.EXPIRED, VENDOR_TEAM_INVITE_STATUS.CANCELLED].includes(
      this.value as never,
    );
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_TEAM_INVITE_STATUS.PENDING]: [
        VENDOR_TEAM_INVITE_STATUS.ACCEPTED,
        VENDOR_TEAM_INVITE_STATUS.REJECTED,
        VENDOR_TEAM_INVITE_STATUS.EXPIRED,
        VENDOR_TEAM_INVITE_STATUS.CANCELLED,
      ],
      [VENDOR_TEAM_INVITE_STATUS.ACCEPTED]: [],
      [VENDOR_TEAM_INVITE_STATUS.REJECTED]: [],
      [VENDOR_TEAM_INVITE_STATUS.EXPIRED]: [],
      [VENDOR_TEAM_INVITE_STATUS.CANCELLED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
