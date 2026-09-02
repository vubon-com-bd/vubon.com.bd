import { z } from 'zod';
import { envSchema, EnvSchema } from './env.schema';

/**
 * Environment Variables Validation
 * এনভায়রনমেন্ট ভেরিয়েবল ভ্যালিডেশন
 */
export class EnvValidation {
  private static instance: EnvValidation;
  private validatedEnv: EnvSchema | null = null;
  private errors: string[] = [];

  private constructor() {}

  /**
   * Get singleton instance
   * সিঙ্গেলটন ইনস্ট্যান্স পাওয়া
   */
  static getInstance(): EnvValidation {
    if (!EnvValidation.instance) {
      EnvValidation.instance = new EnvValidation();
    }
    return EnvValidation.instance;
  }

  /**
   * Validate environment variables
   * এনভায়রনমেন্ট ভেরিয়েবল ভ্যালিডেট করা
   */
  validate(env: NodeJS.ProcessEnv = process.env): EnvSchema {
    try {
      this.errors = [];
      this.validatedEnv = envSchema.parse(env);
      return this.validatedEnv;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errors = error.errors.map((err: z.ZodIssue) => {
          const path = err.path.join('.');
          return `${path}: ${err.message}`;
        });
        throw new Error(
          `Environment validation failed with ${this.errors.length} error(s):\n${this.errors.join('\n')}`
        );
      }
      throw error;
    }
  }

  /**
   * Get validated environment
   * ভ্যালিডেটেড এনভায়রনমেন্ট পাওয়া
   */
  getEnv(): EnvSchema {
    if (!this.validatedEnv) {
      this.validate();
    }
    return this.validatedEnv!;
  }

  /**
   * Get validation errors
   * ভ্যালিডেশন এরর পাওয়া
   */
  getErrors(): string[] {
    return this.errors;
  }

  /**
   * Check if validation passed
   * ভ্যালিডেশন পাস করেছে কিনা চেক করা
   */
  isValid(): boolean {
    return this.errors.length === 0 && this.validatedEnv !== null;
  }

  /**
   * Check if in development mode
   * ডেভেলপমেন্ট মোডে কিনা চেক করা
   */
  isDevelopment(): boolean {
    return this.getEnv().NODE_ENV === 'development';
  }

  /**
   * Check if in production mode
   * প্রোডাকশন মোডে কিনা চেক করা
   */
  isProduction(): boolean {
    return this.getEnv().NODE_ENV === 'production';
  }

  /**
   * Check if in test mode
   * টেস্ট মোডে কিনা চেক করা
   */
  isTest(): boolean {
    return this.getEnv().NODE_ENV === 'test';
  }

  /**
   * Check if debug is enabled
   * ডিবাগ ইন্যাবলেড কিনা চেক করা
   */
  isDebug(): boolean {
    return this.getEnv().DEBUG === true;
  }

  /**
   * Get application name
   * অ্যাপ্লিকেশন নাম পাওয়া
   */
  getAppName(): string {
    return this.getEnv().APP_NAME;
  }

  /**
   * Get application version
   * অ্যাপ্লিকেশন ভার্সন পাওয়া
   */
  getAppVersion(): string {
    return this.getEnv().APP_VERSION;
  }

  /**
   * Get database URL
   * ডেটাবেস ইউআরএল পাওয়া
   */
  getDatabaseUrl(): string {
    return this.getEnv().DATABASE_URL;
  }

  /**
   * Get Redis URL
   * রেডিস ইউআরএল পাওয়া
   */
  getRedisUrl(): string {
    return this.getEnv().REDIS_URL;
  }

  /**
   * Get JWT secret
   * জেডব্লিউটি সিক্রেট পাওয়া
   */
  getJwtSecret(): string {
    return this.getEnv().JWT_SECRET;
  }

  /**
   * Get JWT refresh secret
   * জেডব্লিউটি রিফ্রেশ সিক্রেট পাওয়া
   */
  getJwtRefreshSecret(): string {
    return this.getEnv().JWT_REFRESH_SECRET;
  }

  /**
   * Get JWT expires in
   * জেডব্লিউটি এক্সপায়ার সময় পাওয়া
   */
  getJwtExpiresIn(): string {
    return this.getEnv().JWT_EXPIRES_IN;
  }

  /**
   * Get JWT refresh expires in
   * জেডব্লিউটি রিফ্রেশ এক্সপায়ার সময় পাওয়া
   */
  getJwtRefreshExpiresIn(): string {
    return this.getEnv().JWT_REFRESH_EXPIRES_IN;
  }

  /**
   * Get port
   * পোর্ট পাওয়া
   */
  getPort(): number {
    return this.getEnv().PORT;
  }

  /**
   * Get host
   * হোস্ট পাওয়া
   */
  getHost(): string {
    return this.getEnv().HOST;
  }

  /**
   * Get base URL
   * বেস ইউআরএল পাওয়া
   */
  getBaseUrl(): string {
    return this.getEnv().BASE_URL;
  }

  /**
   * Get API prefix
   * এপিআই প্রিফিক্স পাওয়া
   */
  getApiPrefix(): string {
    return this.getEnv().API_PREFIX;
  }

  /**
   * Get rate limit config
   * রেট লিমিট কনফিগ পাওয়া
   */
  getRateLimitConfig(): { windowMs: number; max: number } {
    return {
      windowMs: this.getEnv().RATE_LIMIT_WINDOW_MS,
      max: this.getEnv().RATE_LIMIT_MAX,
    };
  }

  /**
   * Get CORS origin
   * সিওআরএস অরিজিন পাওয়া
   */
  getCorsOrigin(): string[] | string {
    const origin = this.getEnv().CORS_ORIGIN;
    if (origin.includes(',')) {
      return origin.split(',').map((o: string) => o.trim());
    }
    return origin;
  }

  /**
   * Get SSLCommerz config
   * এসএসএল কমার্জ কনফিগ পাওয়া
   */
  getSSLCommerzConfig() {
    const env = this.getEnv();
    return {
      storeId: env.SSLCOMMERZ_STORE_ID,
      storePassword: env.SSLCOMMERZ_STORE_PASSWORD,
      sandbox: env.SSLCOMMERZ_SANDBOX,
    };
  }

  /**
   * Get bKash config
   * বিকাশ কনফিগ পাওয়া
   */
  getBkashConfig() {
    const env = this.getEnv();
    return {
      appKey: env.BKASH_APP_KEY,
      appSecret: env.BKASH_APP_SECRET,
      username: env.BKASH_USERNAME,
      password: env.BKASH_PASSWORD,
      sandbox: env.BKASH_SANDBOX,
    };
  }

  /**
   * Get Nagad config
   * নগদ কনফিগ পাওয়া
   */
  getNagadConfig() {
    const env = this.getEnv();
    return {
      merchantId: env.NAGAD_MERCHANT_ID,
      merchantSecret: env.NAGAD_MERCHANT_SECRET,
      sandbox: env.NAGAD_SANDBOX,
    };
  }

  /**
   * Get Rocket config
   * রকেট কনফিগ পাওয়া
   */
  getRocketConfig() {
    const env = this.getEnv();
    return {
      merchantId: env.ROCKET_MERCHANT_ID,
      merchantSecret: env.ROCKET_MERCHANT_SECRET,
      sandbox: env.ROCKET_SANDBOX,
    };
  }

  /**
   * Get default payment gateway
   * ডিফল্ট পেমেন্ট গেটওয়ে পাওয়া
   */
  getDefaultPaymentGateway(): string {
    return this.getEnv().DEFAULT_PAYMENT_GATEWAY;
  }

  /**
   * Get SMS config
   * এসএমএস কনফিগ পাওয়া
   */
  getSMSConfig() {
    const env = this.getEnv();
    return {
      provider: env.SMS_PROVIDER,
      apiKey: env.SMS_API_KEY,
      apiSecret: env.SMS_API_SECRET,
      senderId: env.SMS_SENDER_ID,
      testMode: env.SMS_TEST_MODE,
    };
  }

  /**
   * Get Email config
   * ইমেইল কনফিগ পাওয়া
   */
  getEmailConfig() {
    const env = this.getEnv();
    return {
      provider: env.EMAIL_PROVIDER,
      apiKey: env.EMAIL_API_KEY,
      apiSecret: env.EMAIL_API_SECRET,
      from: env.EMAIL_FROM,
      testMode: env.EMAIL_TEST_MODE,
    };
  }

  /**
   * Get timezone
   * টাইমজোন পাওয়া
   */
  getTimezone(): string {
    return this.getEnv().TIMEZONE;
  }

  /**
   * Check if database SSL is enabled
   * ডেটাবেস এসএসএল ইন্যাবলেড কিনা চেক করা
   */
  isDatabaseSSL(): boolean {
    return this.getEnv().DATABASE_SSL;
  }

  /**
   * Get database pool config
   * ডেটাবেস পুল কনফিগ পাওয়া
   */
  getDatabasePoolConfig(): { min: number; max: number } {
    return {
      min: this.getEnv().DATABASE_POOL_MIN,
      max: this.getEnv().DATABASE_POOL_MAX,
    };
  }

  /**
   * Get Redis TTL config
   * রেডিস টিটিএল কনফিগ পাওয়া
   */
  getRedisTTLConfig() {
    const env = this.getEnv();
    return {
      session: env.REDIS_TTL_SESSION,
      cache: env.REDIS_TTL_CACHE,
      queue: env.REDIS_TTL_QUEUE,
      otp: env.REDIS_TTL_OTP,
      verification: env.REDIS_TTL_VERIFICATION,
    };
  }

  /**
   * Get all environment variables
   * সব এনভায়রনমেন্ট ভেরিয়েবল পাওয়া
   */
  getAll(): EnvSchema {
    return this.getEnv();
  }

  /**
   * Get environment variable by key
   * এনভায়রনমেন্ট ভেরিয়েবল কী দ্বারা পাওয়া
   */
  get<K extends keyof EnvSchema>(key: K): EnvSchema[K] {
    return this.getEnv()[key];
  }

  /**
   * Check if environment variable exists
   * এনভায়রনমেন্ট ভেরিয়েবল আছে কিনা চেক করা
   */
  has(key: keyof EnvSchema): boolean {
    try {
      const env = this.getEnv();
      return env[key] !== undefined && env[key] !== null;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const envValidation = EnvValidation.getInstance();

// Export convenience functions
export const validateEnv = (env?: NodeJS.ProcessEnv): EnvSchema => {
  return envValidation.validate(env);
};

export const getEnv = (): EnvSchema => {
  return envValidation.getEnv();
};

export const isDevelopment = (): boolean => {
  return envValidation.isDevelopment();
};

export const isProduction = (): boolean => {
  return envValidation.isProduction();
};

export const isTest = (): boolean => {
  return envValidation.isTest();
};

export const isDebug = (): boolean => {
  return envValidation.isDebug();
};
