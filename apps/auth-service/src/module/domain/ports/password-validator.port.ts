/**
 * Password Validator Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/password-validator.port
 *
 * @description
 * Port (interface) for password validation and strength checking.
 * Defines the contract that infrastructure adapters must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 *
 * @example
 * // Domain usage
 * class Password extends ValueObject {
 *   constructor(
 *     password: string,
 *     private readonly validator: IPasswordValidator
 *   ) {
 *     super();
 *     const result = validator.validate(password);
 *     if (!result.isValid) {
 *       throw new Error(result.errors.join(', '));
 *     }
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Password strength levels (Domain-specific)
 */
export enum PasswordStrength {
  VERY_WEAK = 'very_weak',
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong',
}

/**
 * Password validation result
 */
export interface PasswordValidationResult {
  /** Whether the password is valid */
  isValid: boolean;
  /** Password strength level */
  strength: PasswordStrength;
  /** Password entropy in bits */
  entropy: number;
  /** List of validation errors (if any) */
  errors: string[];
  /** List of warnings (if any) */
  warnings: string[];
  /** List of suggestions for improvement */
  suggestions: string[];
  /** Character set analysis */
  characterSet?: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecial: boolean;
  };
  /** Password length */
  length: number;
}

/**
 * Password entropy result
 */
export interface EntropyResult {
  /** Entropy in bits */
  bits: number;
  /** Strength level */
  strength: PasswordStrength;
  /** Estimated crack time (human-readable) */
  estimatedCrackTime: string;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Password Validator Port Interface
 * Defines the contract for password operations in the domain layer.
 *
 * Enterprise Features:
 * ✅ Type-safe interface with domain enums
 * ✅ Comprehensive strength validation
 * ✅ Entropy calculation
 * ✅ Common password detection
 * ✅ Personal info detection (email, name, phone)
 * ✅ Password generation
 * ✅ Framework-free, pure domain contract
 *
 * @example
 * // Using the port in domain service
 * class UserRegistrationService {
 *   constructor(private readonly passwordValidator: IPasswordValidator) {}
 *
 *   registerUser(password: string): User {
 *     const result = this.passwordValidator.validate(password);
 *     if (!result.isValid) {
 *       throw new Error(result.errors.join(', '));
 *     }
 *     // ... rest of the logic
 *   }
 * }
 */
export interface IPasswordValidator {
  /**
   * Validate a password and return detailed results
   *
   * @param password - Plain text password
   * @param options - Optional validation options
   * @returns Detailed validation result
   *
   * @example
   * const result = validator.validate('MyStr0ng!P@ssw0rd');
   * if (result.isValid) {
   *   console.log(result.strength); // 'strong'
   *   console.log(result.entropy); // 85.2
   * }
   */
  validate(
    password: string,
    options?: {
      /** Minimum required strength (default: MEDIUM) */
      minStrength?: PasswordStrength;
      /** Additional words to check against (e.g., user's name) */
      additionalCommonWords?: string[];
      /** Whether to check against common password list (default: true) */
      checkCommonPasswords?: boolean;
      /** Whether to check for personal info (default: false) */
      checkPersonalInfo?: boolean;
    }
  ): PasswordValidationResult;

  /**
   * Check if password meets minimum requirements
   *
   * @param password - Plain text password
   * @param minStrength - Minimum strength required (default: MEDIUM)
   * @returns True if password meets requirements
   *
   * @example
   * if (validator.isStrongEnough('MyStr0ng!P@ssw0rd')) {
   *   // Password is strong enough
   * }
   */
  isStrongEnough(password: string, minStrength?: PasswordStrength): boolean;

  /**
   * Calculate password entropy
   *
   * @param password - Plain text password
   * @returns Entropy result with bits, strength, and crack time
   *
   * @example
   * const entropy = validator.calculateEntropy('MyStr0ng!P@ssw0rd');
   * console.log(entropy.bits); // 85.2
   * console.log(entropy.estimatedCrackTime); // 'years'
   */
  calculateEntropy(password: string): EntropyResult;

  /**
   * Check if password is commonly used (on breach lists)
   *
   * @param password - Plain text password
   * @returns True if password is common
   *
   * @example
   * if (validator.isCommonPassword('password123')) {
   *   console.log('Password is too common');
   * }
   */
  isCommonPassword(password: string): boolean;

  /**
   * Check if password contains personal information
   *
   * @param password - Plain text password
   * @param personalInfo - Personal information to check against
   * @returns True if password contains personal info
   *
   * @example
   * const containsName = validator.containsPersonalInfo(
   *   'John123',
   *   { name: 'John Doe', email: 'john@example.com', phone: '01712345678' }
   * );
   */
  containsPersonalInfo(
    password: string,
    personalInfo: {
      email?: string;
      name?: string;
      phone?: string;
      username?: string;
      birthdate?: string;
    }
  ): boolean;

  /**
   * Generate a cryptographically secure random password
   *
   * @param length - Desired password length (default: 16)
   * @param options - Generation options
   * @returns Secure password string
   *
   * @example
   * const password = validator.generateSecurePassword(20, {
   *   includeUppercase: true,
   *   includeNumbers: true,
   *   includeSpecial: true,
   * });
   */
  generateSecurePassword(
    length?: number,
    options?: {
      includeLowercase?: boolean;
      includeUppercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    }
  ): string;

  /**
   * Get password strength description
   *
   * @param strength - PasswordStrength enum
   * @returns Human-readable description
   *
   * @example
   * const description = validator.getStrengthDescription(PasswordStrength.STRONG);
   * // 'Strong - Good password with high security'
   */
  getStrengthDescription(strength: PasswordStrength): string;

  /**
   * Get the recommended minimum length for a strength level
   *
   * @param strength - PasswordStrength enum
   * @returns Recommended minimum length
   *
   * @example
   * const minLength = validator.getRecommendedLength(PasswordStrength.STRONG);
   * // 12
   */
  getRecommendedLength(strength: PasswordStrength): number;

  /**
   * Get password requirements for UI display
   *
   * @param minStrength - Minimum strength required (default: MEDIUM)
   * @returns List of requirements with their status
   */
  getRequirements(
    password: string,
    minStrength?: PasswordStrength
  ): Array<{
    key: string;
    label: string;
    labelBn?: string;
    met: boolean;
  }>;
}

// ============================================================
// Utility Types for Testing
// ============================================================

/**
 * Mock password validator for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockPasswordValidator implements IPasswordValidator {
  constructor(
    private readonly isValidResult: boolean = true,
    private readonly strength: PasswordStrength = PasswordStrength.STRONG,
    private readonly entropy: number = 70
  ) {}

  validate(
    password: string,
    options?: {
      minStrength?: PasswordStrength;
      additionalCommonWords?: string[];
      checkCommonPasswords?: boolean;
      checkPersonalInfo?: boolean;
    }
  ): PasswordValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    if (!this.isValidResult) {
      errors.push('Password is too weak');
      suggestions.push('Use a longer password with more character types');
    }

    return {
      isValid: this.isValidResult,
      strength: this.strength,
      entropy: this.entropy,
      errors,
      warnings,
      suggestions,
      characterSet: {
        hasUppercase: true,
        hasLowercase: true,
        hasNumbers: true,
        hasSpecial: true,
      },
      length: password.length,
    };
  }

  isStrongEnough(password: string, minStrength?: PasswordStrength): boolean {
    return this.isValidResult;
  }

  calculateEntropy(password: string): EntropyResult {
    return {
      bits: this.entropy,
      strength: this.strength,
      estimatedCrackTime: this.entropy >= 70 ? 'years' : 'hours',
    };
  }

  isCommonPassword(password: string): boolean {
    return !this.isValidResult;
  }

  containsPersonalInfo(
    password: string,
    personalInfo: {
      email?: string;
      name?: string;
      phone?: string;
      username?: string;
      birthdate?: string;
    }
  ): boolean {
    return false;
  }

  generateSecurePassword(
    length: number = 16,
    options?: {
      includeLowercase?: boolean;
      includeUppercase?: boolean;
      includeNumbers?: boolean;
      includeSpecial?: boolean;
      excludeAmbiguous?: boolean;
    }
  ): string {
    return 'MockGeneratedSecurePassword123!';
  }

  getStrengthDescription(strength: PasswordStrength): string {
    const descriptions: Record<PasswordStrength, string> = {
      [PasswordStrength.VERY_WEAK]: 'Very Weak - Easily guessable',
      [PasswordStrength.WEAK]: 'Weak - Could be cracked quickly',
      [PasswordStrength.MEDIUM]: 'Medium - Acceptable for most uses',
      [PasswordStrength.STRONG]: 'Strong - Good password with high security',
      [PasswordStrength.VERY_STRONG]: 'Very Strong - Excellent password security',
    };
    return descriptions[strength] || 'Unknown';
  }

  getRecommendedLength(strength: PasswordStrength): number {
    const lengths: Record<PasswordStrength, number> = {
      [PasswordStrength.VERY_WEAK]: 6,
      [PasswordStrength.WEAK]: 8,
      [PasswordStrength.MEDIUM]: 10,
      [PasswordStrength.STRONG]: 12,
      [PasswordStrength.VERY_STRONG]: 16,
    };
    return lengths[strength] || 8;
  }

  getRequirements(
    password: string,
    minStrength: PasswordStrength = PasswordStrength.MEDIUM
  ): Array<{ key: string; label: string; labelBn?: string; met: boolean }> {
    const requirements = [
      {
        key: 'length',
        label: `At least ${this.getRecommendedLength(minStrength)} characters`,
        met: password.length >= this.getRecommendedLength(minStrength),
      },
      {
        key: 'uppercase',
        label: 'At least one uppercase letter',
        labelBn: 'কমপক্ষে একটি বড় হাতের অক্ষর',
        met: /[A-Z]/.test(password),
      },
      {
        key: 'lowercase',
        label: 'At least one lowercase letter',
        labelBn: 'কমপক্ষে একটি ছোট হাতের অক্ষর',
        met: /[a-z]/.test(password),
      },
      {
        key: 'number',
        label: 'At least one number',
        labelBn: 'কমপক্ষে একটি সংখ্যা',
        met: /[0-9]/.test(password),
      },
      {
        key: 'special',
        label: 'At least one special character',
        labelBn: 'কমপক্ষে একটি বিশেষ অক্ষর',
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];

    if (this.isValidResult) {
      requirements.forEach(req => (req.met = true));
    }

    return requirements;
  }
}
