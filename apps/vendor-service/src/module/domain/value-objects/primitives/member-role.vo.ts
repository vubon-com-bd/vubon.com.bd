/**
 * MemberRole Value Object — vendor team roles with hierarchy
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_ROLE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_ROLE) as readonly string[];

/** Hierarchy level — higher number = more authority. */
const ROLE_LEVEL: Record<string, number> = {
  [VENDOR_ROLE.OWNER]: 100,
  [VENDOR_ROLE.MANAGER]: 80,
  [VENDOR_ROLE.ORDER_MANAGER]: 70,
  [VENDOR_ROLE.INVENTORY_MANAGER]: 70,
  [VENDOR_ROLE.ACCOUNTANT]: 60,
  [VENDOR_ROLE.MARKETING]: 60,
  [VENDOR_ROLE.CUSTOMER_SUPPORT]: 50,
  [VENDOR_ROLE.STAFF]: 40,
  [VENDOR_ROLE.VIEWER]: 10,
};

export class MemberRoleVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): MemberRoleVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid member role "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'role',
      );
    }
    return new MemberRoleVO(raw);
  }

  static reconstitute(raw: string): MemberRoleVO {
    return new MemberRoleVO(raw);
  }

  getLevel(): number {
    return ROLE_LEVEL[this.value] ?? 0;
  }

  isOwner(): boolean {
    return this.value === VENDOR_ROLE.OWNER;
  }

  isManager(): boolean {
    return this.value === VENDOR_ROLE.MANAGER;
  }

  isViewer(): boolean {
    return this.value === VENDOR_ROLE.VIEWER;
  }

  /** Can this role manage another role? */
  canManage(other: MemberRoleVO): boolean {
    return this.getLevel() > other.getLevel();
  }

  /** Can this role invite / remove team members? */
  canManageTeam(): boolean {
    return this.getLevel() >= ROLE_LEVEL[VENDOR_ROLE.MANAGER]!;
  }

  /** Can this role access financial data? */
  canAccessFinance(): boolean {
    return [
      VENDOR_ROLE.OWNER,
      VENDOR_ROLE.MANAGER,
      VENDOR_ROLE.ACCOUNTANT,
    ].includes(this.value as never);
  }
}
