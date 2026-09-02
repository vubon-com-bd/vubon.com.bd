/**
 * JWT Configuration
 * জেডব্লিউটি কনফিগারেশন
 */
export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
  refreshSecret: string;
  issuer: string;
  audience: string;
}

export const jwtConfig = (): JwtConfig => ({
  secret: process.env.JWT_SECRET || 'jwt-secret-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'jwt-refresh-secret-key-change-in-production',
  issuer: process.env.JWT_ISSUER || 'vubon-platform',
  audience: process.env.JWT_AUDIENCE || 'vubon-users',
});
