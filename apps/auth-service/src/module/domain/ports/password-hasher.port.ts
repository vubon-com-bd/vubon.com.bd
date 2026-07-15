/**
 * Password Hasher Port - Domain Layer Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/ports/password-hasher.port
 *
 * @description
 * Port (interface) for password hashing and verification.
 * Defines the contract that infrastructure adapters must implement.
 * This keeps the domain layer clean and infrastructure-agnostic.
 *
 * Enterprise Rules:
 * ✅ Domain layer defines the interface (Port)
 * ✅ Infrastructure layer implements the interface (Adapter)
 * ✅ No external dependencies in domain layer
 * ✅ Follows Dependency Inversion Principle (DIP)
 * ✅ Easy to mock for unit testing
 * ✅ Allows swapping hashing algorithms without domain changes
 *
 * @example
 * // Domain usage
 * class User {
 *   constructor(
 *     private readonly passwordHasher: IPasswordHasher
 *   ) {}
 *
 *   async setPassword(plainPassword: string): Promise<void> {
 *     this.hashedPassword = await this.passwordHasher.hash(plainPassword);
 *   }
 *
 *   async verifyPassword(plainPassword: string): Promise<boolean> {
 *     return this.passwordHasher.compare(plainPassword, this.hashedPassword);
 *   }
 * }
 *
 * // Infrastructure implementation
 * class BcryptPasswordHasher implements IPasswordHasher {
 *   async hash(password: string): Promise<string> {
 *     return bcrypt.hash(password, 10);
 *   }
 *
 *   async compare(password: string, hash: string): Promise<boolean> {
 *     return bcrypt.compare(password, hash);
 *   }
 * }
 */

// ============================================================
// Types (Domain-Specific)
// ============================================================

/**
 * Hashing algorithm types (Domain-specific)
 */
export type HashingAlgorithm = 
  | 'bcrypt' 
  | 'argon2id' 
  | 'scrypt' 
  | 'pbkdf2' 
  | 'sha256' 
  | 'sha512';

/**
 * Password hashing options
 */
export interface HashingOptions {
  /** Salt rounds (for bcrypt) or iterations (for other algorithms) */
  saltRounds?: number | undefined;
  /** Memory cost (for Argon2id) */
  memoryCost?: number | undefined;
  /** Time cost (for Argon2id) */
  timeCost?: number | undefined;
  /** Parallelism (for Argon2id) */
  parallelism?: number | undefined;
  /** Key length (for derived keys) */
  keyLength?: number | undefined;
  /** Salt length (for random salt generation) */
  saltLength?: number | undefined;
  /** Algorithm to use (default: bcrypt) */
  algorithm?: HashingAlgorithm | undefined;
}

/**
 * Hash result with metadata
 */
export interface HashResult {
  /** Hashed password string (with algorithm metadata) */
  hash: string;
  /** Algorithm used */
  algorithm: HashingAlgorithm;
  /** Salt used (if applicable) */
  salt?: string | undefined;
  /** Version of the hashing algorithm */
  version?: string | undefined;
  /** Additional metadata for audit/compliance */
  metadata?: {
    /** Time taken to hash in milliseconds */
    durationMs?: number | undefined;
    /** Iterations/Salt rounds used */
    rounds?: number | undefined;
    /** Memory cost (for Argon2id) */
    memoryCost?: number | undefined;
    /** Time cost (for Argon2id) */
    timeCost?: number | undefined;
    /** Parallelism (for Argon2id) */
    parallelism?: number | undefined;
  } | undefined;
}

/**
 * Hash verification result
 */
export interface HashVerificationResult {
  /** Whether the password matches the hash */
  isValid: boolean;
  /** Algorithm used for verification */
  algorithm?: HashingAlgorithm | undefined;
  /** Error message (if verification failed) */
  error?: string | undefined;
  /** Whether the hash needs rehashing (for security upgrade) */
  needsRehash?: boolean | undefined;
  /** Suggested new algorithm if rehashing is needed */
  suggestedAlgorithm?: HashingAlgorithm | undefined;
}

// ============================================================
// Port Interface (Domain Contract)
// ============================================================

/**
 * Password Hasher Port Interface
 * Defines the contract for password hashing operations in the domain layer.
 *
 * Enterprise Features:
 * ✅ Type-safe interface with domain types
 * ✅ Support for multiple hashing algorithms
 * ✅ Metadata for audit and compliance
 * ✅ Rehashing detection for security upgrades
 * ✅ Batch hashing support (for performance)
 * ✅ Health check for hashing service
 *
 * @example
 * // Using the port in domain service
 * class RegisterUserHandler {
 *   constructor(
 *     private readonly userRepository: UserRepository,
 *     private readonly passwordHasher: IPasswordHasher
 *   ) {}
 *
 *   async execute(command: RegisterUserCommand): Promise<void> {
 *     const hashedPassword = await this.passwordHasher.hash(
 *       command.password
 *     );
 *     // ... rest of the logic
 *   }
 * }
 */
export interface IPasswordHasher {
  // ============================================================
  // Core Methods
  // ============================================================

  /**
   * Hash a plain text password
   *
   * @param password - Plain text password
   * @param options - Optional hashing options (algorithm, salt rounds, etc.)
   * @returns Hashed password with metadata
   * @throws {Error} If hashing fails
   *
   * @example
   * const result = await hasher.hash('MyStr0ng!P@ssw0rd');
   * console.log(result.hash); // '$2b$10$...'
   * console.log(result.algorithm); // 'bcrypt'
   */
  hash(password: string, options?: HashingOptions): Promise<HashResult>;

  /**
   * Compare a plain text password with a hash
   *
   * @param password - Plain text password
   * @param hash - Hashed password string
   * @returns Verification result with metadata
   *
   * @example
   * const result = await hasher.compare('MyStr0ng!P@ssw0rd', storedHash);
   * if (result.isValid) {
   *   // Password matches
   *   if (result.needsRehash) {
   *     // Upgrade to new algorithm
   *   }
   * }
   */
  compare(password: string, hash: string): Promise<HashVerificationResult>;

  // ============================================================
  // Security & Audit Methods
  // ============================================================

  /**
   * Check if a hash needs rehashing (for security upgrades)
   *
   * @param hash - Hashed password string
   * @param options - Options for checking (min salt rounds, algorithm, etc.)
   * @returns True if rehashing is needed
   *
   * @example
   * const needsRehash = await hasher.needsRehash(storedHash, {
   *   minSaltRounds: 12,
   *   preferredAlgorithm: 'argon2id'
   * });
   */
  needsRehash(
    hash: string,
    options?: {
      /** Minimum salt rounds required */
      minSaltRounds?: number | undefined;
      /** Preferred algorithm */
      preferredAlgorithm?: HashingAlgorithm | undefined;
      /** Minimum version required */
      minVersion?: string | undefined;
    },
  ): Promise<boolean>;

  /**
   * Get the algorithm used for a hash
   *
   * @param hash - Hashed password string
   * @returns Algorithm used
   * @throws {Error} If hash format is invalid
   *
   * @example
   * const algorithm = await hasher.getAlgorithm('$2b$10$...');
   * // 'bcrypt'
   */
  getAlgorithm(hash: string): Promise<HashingAlgorithm>;

  /**
   * Check if a hash uses a secure algorithm
   *
   * @param hash - Hashed password string
   * @returns True if algorithm is secure
   *
   * @example
   * const isSecure = await hasher.isSecure('$2b$10$...');
   * // true
   */
  isSecure(hash: string): Promise<boolean>;

  // ============================================================
  // Batch Operations (for performance)
  // ============================================================

  /**
   * Hash multiple passwords in batch
   *
   * @param passwords - Array of plain text passwords
   * @param options - Hashing options
   * @returns Array of hash results
   *
   * @example
   * const results = await hasher.hashBatch([
   *   'password1',
   *   'password2',
   *   'password3'
   * ]);
   */
  hashBatch(
    passwords: string[],
    options?: HashingOptions,
  ): Promise<Array<HashResult & { passwordIndex: number }>>;

  /**
   * Compare multiple passwords in batch
   *
   * @param pairs - Array of { password, hash } pairs
   * @returns Array of verification results
   *
   * @example
   * const results = await hasher.compareBatch([
   *   { password: 'pass1', hash: '$2b$10$...' },
   *   { password: 'pass2', hash: '$2b$10$...' }
   * ]);
   */
  compareBatch(
    pairs: Array<{ password: string; hash: string }>,
  ): Promise<Array<HashVerificationResult & { pairIndex: number }>>;

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Generate a secure random salt
   *
   * @param length - Salt length in bytes (default: 16)
   * @param options - Additional options
   * @returns Salt string
   *
   * @example
   * const salt = await hasher.generateSalt(16);
   */
  generateSalt(
    length?: number,
    options?: {
      /** Encoding (base64, hex, etc.) */
      encoding?: 'base64' | 'hex' | 'buffer' | undefined;
    },
  ): Promise<string>;

  /**
   * Get the recommended hashing options for the current environment
   *
   * @param environment - 'development' | 'staging' | 'production'
   * @returns Recommended hashing options
   *
   * @example
   * const options = await hasher.getRecommendedOptions('production');
   * // Returns: { algorithm: 'argon2id', saltRounds: 12, ... }
   */
  getRecommendedOptions(
    environment?: 'development' | 'staging' | 'production',
  ): Promise<HashingOptions>;

  /**
   * Get the strength of a hash (security level)
   *
   * @param hash - Hashed password string
   * @returns Strength level (1-10)
   *
   * @example
   * const strength = await hasher.getHashStrength('$2b$10$...');
   * // 7
   */
  getHashStrength(hash: string): Promise<number>;

  // ============================================================
  // Health Check
  // ============================================================

  /**
   * Health check for password hasher service
   *
   * @returns Health status
   *
   * @example
   * const status = await hasher.healthCheck();
   * // { healthy: true, algorithm: 'bcrypt', version: '2b' }
   */
  healthCheck(): Promise<{
    /** Whether the hasher is healthy */
    healthy: boolean;
    /** Supported algorithms */
    supportedAlgorithms: HashingAlgorithm[];
    /** Default algorithm */
    defaultAlgorithm: HashingAlgorithm;
    /** Error message (if unhealthy) */
    error?: string | undefined;
    /** Performance metrics */
    metrics?: {
      averageHashTimeMs: number;
      averageVerifyTimeMs: number;
    } | undefined;
  }>;
}

// ============================================================
// Utility Types for Testing
// ============================================================
/**
 * Mock password hasher for testing
 * Can be used in unit tests to avoid external dependencies
 */
export class MockPasswordHasher implements IPasswordHasher {
  private readonly defaultHash = '$2b$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private readonly defaultAlgorithm: HashingAlgorithm = 'bcrypt';
  private readonly saltRounds = 10;

  constructor(
    private readonly alwaysValid: boolean = true,
    private readonly mockHash: string = this.defaultHash,
  ) {}

  async hash(password: string, options?: HashingOptions): Promise<HashResult> {
    const algorithm = options?.algorithm ?? this.defaultAlgorithm;
    const saltRounds = options?.saltRounds ?? this.saltRounds;

    const mockHashBase = password.length > 0 ? this.mockHash : this.defaultHash;
    const resultHash = `${mockHashBase}${saltRounds}`;

    return {
      hash: resultHash,
      algorithm,
      salt: 'mocksalt',
      version: 'mock-v1',
      metadata: {
        durationMs: 10,
        rounds: saltRounds,
      },
    };
  }

  async compare(password: string, hash: string): Promise<HashVerificationResult> {
    const isValid = this.alwaysValid && password.length > 0 && hash.length > 0;
    const algorithm = await this.getAlgorithm(hash);

    return {
      isValid,
      algorithm,
      needsRehash: false,
      suggestedAlgorithm: algorithm,
      error: isValid ? undefined : 'Invalid password or hash',
    };
  }

  async needsRehash(
    hash: string,
    options?: {
      minSaltRounds?: number | undefined;
      preferredAlgorithm?: HashingAlgorithm | undefined;
      minVersion?: string | undefined;
    },
  ): Promise<boolean> {
    // ✅ FIXED: Properly handle undefined options with nullish coalescing
    const minRounds = (options?.minSaltRounds !== undefined && options?.minSaltRounds !== null) 
      ? options.minSaltRounds 
      : 12;
    
    const preferred = (options?.preferredAlgorithm !== undefined && options?.preferredAlgorithm !== null)
      ? options.preferredAlgorithm
      : 'argon2id';
    
    const algorithm = await this.getAlgorithm(hash);

    const currentRounds = 10;
    return currentRounds < minRounds || algorithm !== preferred;
  }

  async getAlgorithm(hash: string): Promise<HashingAlgorithm> {
    // ✅ FIXED: Handle undefined or empty hash
    if (!hash || hash.length === 0) {
      return this.defaultAlgorithm;
    }

    // Simple hash-based detection for mock
    if (hash.startsWith('$2b$')) return 'bcrypt';
    if (hash.startsWith('$argon2id$')) return 'argon2id';
    if (hash.startsWith('$scrypt$')) return 'scrypt';
    if (hash.startsWith('pbkdf2_')) return 'pbkdf2';
    if (hash.length === 64) return 'sha256';
    if (hash.length === 128) return 'sha512';
    return this.defaultAlgorithm;
  }

  async isSecure(hash: string): Promise<boolean> {
    const algorithm = await this.getAlgorithm(hash);
    const secureAlgorithms: HashingAlgorithm[] = ['bcrypt', 'argon2id', 'scrypt'];
    return secureAlgorithms.includes(algorithm);
  }

  async hashBatch(
  passwords: string[],
  options?: HashingOptions,
): Promise<Array<HashResult & { passwordIndex: number }>> {
  const results: Array<HashResult & { passwordIndex: number }> = [];
  for (let i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    // ✅ Type guard: check if password exists
    if (!password) {
      // Skip or handle undefined password
      continue;
    }
    const result = await this.hash(password, options);
    results.push({
      ...result,
      passwordIndex: i,
    });
  }
  return results;
}

async compareBatch(
  pairs: Array<{ password: string; hash: string }>,
): Promise<Array<HashVerificationResult & { pairIndex: number }>> {
  const results: Array<HashVerificationResult & { pairIndex: number }> = [];
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    // ✅ Type guard: check if pair exists
    if (!pair) {
      continue;
    }
    const { password, hash } = pair;
    // ✅ Type guard: check if password and hash exist
    if (!password || !hash) {
      continue;
    }
    const result = await this.compare(password, hash);
    results.push({
      ...result,
      pairIndex: i,
    });
  }
  return results;
}

  async generateSalt(
    length: number = 16,
    options?: {
      encoding?: 'base64' | 'hex' | 'buffer' | undefined;
    },
  ): Promise<string> {
    // ✅ FIXED: Properly handle undefined options
    const encoding = (options?.encoding !== undefined && options?.encoding !== null)
      ? options.encoding
      : 'base64';
    
    // Generate a deterministic salt based on length and encoding
    let salt = '';
    for (let i = 0; i < length; i++) {
      salt += String.fromCharCode(65 + (i % 26));
    }
    
    // ✅ FIXED: Use proper conditional checks
    if (encoding === 'hex') {
      return Buffer.from(salt).toString('hex');
    }
    if (encoding === 'buffer') {
      return Buffer.from(salt).toString('base64');
    }
    return salt;
  }

  async getRecommendedOptions(
    environment?: 'development' | 'staging' | 'production',
  ): Promise<HashingOptions> {
    const isProd = environment === 'production';
    const isStaging = environment === 'staging';

    return {
      algorithm: isProd ? 'argon2id' : 'bcrypt',
      saltRounds: isProd ? 12 : isStaging ? 10 : 8,
      memoryCost: isProd ? 65536 : 32768,
      timeCost: isProd ? 3 : 2,
      parallelism: isProd ? 4 : 2,
      keyLength: 32,
    };
  }

  async getHashStrength(hash: string): Promise<number> {
    const algorithm = await this.getAlgorithm(hash);
    const strengthMap: Record<HashingAlgorithm, number> = {
      bcrypt: 7,
      argon2id: 9,
      scrypt: 8,
      pbkdf2: 6,
      sha256: 3,
      sha512: 4,
    };
    return strengthMap[algorithm] ?? 5;
  }

  async healthCheck(): Promise<{
    healthy: boolean;
    supportedAlgorithms: HashingAlgorithm[];
    defaultAlgorithm: HashingAlgorithm;
    error?: string | undefined;
    metrics?: {
      averageHashTimeMs: number;
      averageVerifyTimeMs: number;
    } | undefined;
  }> {
    return {
      healthy: true,
      supportedAlgorithms: ['bcrypt', 'argon2id', 'scrypt', 'pbkdf2', 'sha256', 'sha512'],
      defaultAlgorithm: this.defaultAlgorithm,
      metrics: {
        averageHashTimeMs: 10,
        averageVerifyTimeMs: 5,
      },
    };
  }
}
