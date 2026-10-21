/**
 * Crypto Infra Configuration (crypto gateway adapter)
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CRYPTO_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CRYPTO_ENABLED', false),
  rpcUrl: getOptionalEnv('CRYPTO_RPC_URL', ''),
  usdtContract: getOptionalEnv('CRYPTO_USDT_CONTRACT', ''),
  btcNetwork: getOptionalEnv('CRYPTO_BTC_NETWORK', 'testnet'),
  confirmationBlocks: getOptionalEnvInt('CRYPTO_CONFIRMATION_BLOCKS', 3),
  timeoutMs: getOptionalEnvInt('CRYPTO_TIMEOUT_MS', 60_000),
});

export type CryptoInfraConfig = typeof CRYPTO_INFRA_CONFIG;
