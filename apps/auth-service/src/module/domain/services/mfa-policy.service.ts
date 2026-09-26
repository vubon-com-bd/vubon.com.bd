/**
 * MfaPolicyService — Decides when MFA is required
 * @module auth-service/domain/services
 *
 * Rules:
 * - Admin/super_admin roles MUST always use MFA
 * - User has enabled MFA → always required
 * - New device from new country → required
 * - High-risk IP → required
 */
import { UserEntity } from '../entities/user.entity';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';
import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { MfaRequiredError } from '../errors/mfa.errors';

export interface MfaRequiredContext {
  readonly user: UserEntity;
  readonly mfa: AuthMfaEntity | null;
  readonly device: AuthDeviceEntity | null;
  readonly isNewCountry: boolean;
  readonly isHighRiskIp: boolean;
}

export class MfaPolicyService {
  static isRequired(ctx: MfaRequiredContext): boolean {
    if (ctx.mfa && ctx.mfa.isEnabled()) return true;
    if (MfaPolicyService.isPrivilegedUser(ctx.user)) return true;
    if (ctx.isHighRiskIp) return true;
    if (ctx.isNewCountry) return true;
    if (ctx.device === null) return true;
    if (!ctx.device.isTrusted()) return true;
    return false;
  }

  static assertSatisfied(ctx: MfaRequiredContext): void {
    if (MfaPolicyService.isRequired(ctx)) {
      // Caller must then run MFA verification step
      if (!ctx.mfa || !ctx.mfa.isEnabled()) {
        throw new MfaRequiredError(ctx.user.id);
      }
    }
  }

  private static isPrivilegedUser(user: UserEntity): boolean {
    return user.roles.some((r) => r.isAdminLevel() || r.isSuperAdmin());
  }
}
