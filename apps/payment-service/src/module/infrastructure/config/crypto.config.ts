import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CRYPTO_CONFIG = Object.freeze({
  walletAddress: getEnv('CRYPTO_WALLET_ADDRESS'),
  network: getEnv('CRYPTO_NETWORK'),
  rpcUrl: getEnv('CRYPTO_RPC_URL'),
  confirmationsRequired: getOptionalEnvInt('CRYPTO_CONFIRMATIONS', 3),
  timeoutMs: getOptionalEnvInt('CRYPTO_TIMEOUT_MS', 60000),
} as const);
