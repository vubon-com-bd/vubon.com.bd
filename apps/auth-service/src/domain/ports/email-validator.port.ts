export interface EmailValidatorConfig {
  allowDisposable: boolean;
  allowEducational: boolean;
  allowedDomains: string[];
  blockedDomains: string[];
  disposableDomains: string[];
  maxLength: number;
  autoNormalize: boolean;
  dnsValidation: boolean;
}

export interface EmailValidationResult {
  valid: string[];
  invalid: string[];
}

export interface EmailValidationDetails {
  isValid: boolean;
  normalized: string;
  domain: string | null;
  localPart: string | null;
  isDisposable: boolean;
  isEducational: boolean;
  hasPlusAlias: boolean;
  obfuscated: string;
  strippedEmail: string;
  isBlocked: boolean;
  isAllowed: boolean;
  errors: string[];
}

export interface EmailValidator {
  isValid(email: string): boolean;
  isDisposable(email: string): boolean;
  isEducational(email: string): boolean;
  normalize(email: string): string;
  getDomain(email: string): string | null;
  getLocalPart(email: string): string | null;
  isFromDomain(email: string, domain: string): boolean;
  isFromAllowedDomains(email: string, allowedDomains: string[]): boolean;
  obfuscate(email: string): string;
  hasPlusAlias(email: string): boolean;
  stripPlusAlias(email: string): string;
  validateMany(emails: string[]): EmailValidationResult;
  validateWithDetails(email: string): EmailValidationDetails;
  isBlocked(email: string): boolean;
  isAllowed(email: string): boolean;
  getConfig(): EmailValidatorConfig;
  setConfig(config: Partial<EmailValidatorConfig>): void;
  addDisposableDomains(domains: string[]): void;
  addBlockedDomains(domains: string[]): void;
  addAllowedDomains(domains: string[]): void;
  validateWithConfig(
    email: string,
    config?: Partial<EmailValidatorConfig>
  ): { isValid: boolean; errors: string[]; normalized: string };
}
