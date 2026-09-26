import { Injectable } from '@nestjs/common';
import { CRYPTO_CONFIG } from '../../config/crypto.config';

@Injectable()
export class CryptoConfig {
  readonly walletAddress = CRYPTO_CONFIG.walletAddress;
  readonly network = CRYPTO_CONFIG.network;
  readonly rpcUrl = CRYPTO_CONFIG.rpcUrl;
  readonly confirmationsRequired = CRYPTO_CONFIG.confirmationsRequired;
  readonly timeoutMs = CRYPTO_CONFIG.timeoutMs;
}
