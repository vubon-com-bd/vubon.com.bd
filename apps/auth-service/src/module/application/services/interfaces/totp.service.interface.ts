/**
 * TotpServiceInterface — Time-based OTP (RFC 6238)
 * @module auth-service/application/services/interfaces
 */
export interface TotpServiceInterface {
  readonly name: string;
  generateSecret(): string;
  buildOtpAuthUrl(input: {
    secret: string;
    accountName: string;
    issuer: string;
  }): string;
  verify(input: {
    secret: string;
    code: string;
    window?: number;
  }): Promise<boolean>;
}
