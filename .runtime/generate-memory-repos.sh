#!/data/data/com.termux/files/usr/bin/bash

BASE_DIR="$HOME/vubon.com.bd/apps/identity-service/src/module/infrastructure/persistence/memory/repositories"
mkdir -p "$BASE_DIR"

# ⚠️ user, session, token EXCLUDED — already hand-crafted with full logic
REPOS=(
  "auth:AuthEntity"
  "mfa:MfaEntity"
  "device:DeviceEntity"
  "login-attempt:LoginAttemptEntity"
  "account-lock:AccountLockEntity"
  "backup-code:BackupCodeEntity"
  "credential:CredentialEntity"
  "verification:VerificationEntity"
  "social-account:SocialAccountEntity"
  "oauth-client:OAuthClientEntity"
  "sso-config:SsoConfigEntity"
  "role:RoleEntity"
  "permission:PermissionEntity"
  "auth-2fa:AuthTwoFactorEntity"
  "auth-biometric:AuthBiometricEntity"
  "auth-recovery-code:AuthRecoveryCodeEntity"
  "user-profile:UserProfileEntity"
  "user-settings:UserSettingsEntity"
  "user-preferences:UserPreferencesEntity"
  "user-address:UserAddressEntity"
  "user-contact:UserContactEntity"
  "user-verification:UserVerificationEntity"
  "user-kyc:UserKycEntity"
  "user-activity:UserActivityEntity"
)

for entry in "${REPOS[@]}"; do
  name="${entry%%:*}"
  entity="${entry##*:}"
  file="$BASE_DIR/${name}.memory.repository.ts"

  cat > "$file" << REPO_EOF
/**
 * ${entity} In-Memory Repository
 * @module identity-service/infrastructure/persistence/memory/repositories
 *
 * NOTE: Minimal CRUD via InMemoryRepository base.
 * Add custom methods later as needed.
 */
import { Injectable } from '@nestjs/common';
import { InMemoryRepository } from '@vubon/shared-kernel/infrastructure/persistence/memory';
import type { ${entity} } from '../../../../domain/entities/${name}.entity.js';

@Injectable()
export class InMemory${entity}Repository
  extends InMemoryRepository<${entity}, string>
{
  protected idOf(entity: ${entity}): string {
    return entity.id;
  }
}
REPO_EOF

  echo "✅ $file"
done

echo ""
echo "=== Total .ts in memory/repositories ==="
ls "$BASE_DIR"/*.ts 2>/dev/null | wc -l
