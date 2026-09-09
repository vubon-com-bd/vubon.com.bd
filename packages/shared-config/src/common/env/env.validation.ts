import { EnvSchema } from './env.schema';

export const validateEnv = (): void => {
  try {
    EnvSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    process.exit(1);
  }
};

export const getEnv = <T>(key: string, defaultValue?: T): T => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value as T;
};
