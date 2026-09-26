import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { CryptoConfig } from './crypto.config';
import type {
  CryptoVerifyPaymentRequest,
  CryptoVerifyPaymentResponse,
} from './crypto.types';

@Injectable()
export class CryptoClient {
  private readonly logger = new Logger(CryptoClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: CryptoConfig) {
    this.http = axios.create({
      baseURL: this.config.rpcUrl,
      timeout: this.config.timeoutMs,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getTransaction(txHash: string): Promise<Readonly<Record<string, unknown>>> {
    const { data } = await this.http.post<{
      result?: Readonly<Record<string, unknown>>;
    }>('/', {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionByHash',
      params: [txHash],
    });
    return data.result ?? {};
  }

  async getTransactionReceipt(txHash: string): Promise<Readonly<Record<string, unknown>>> {
    const { data } = await this.http.post<{
      result?: Readonly<Record<string, unknown>>;
    }>('/', {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    });
    return data.result ?? {};
  }

  async verifyPayment(
    input: CryptoVerifyPaymentRequest,
  ): Promise<CryptoVerifyPaymentResponse> {
    const tx = await this.getTransaction(input.txHash);
    const receipt = await this.getTransactionReceipt(input.txHash);

    const to = typeof tx['to'] === 'string' ? tx['to'].toLowerCase() : '';
    const expectedTo = input.walletAddress.toLowerCase();
    const blockNumber =
      typeof receipt['blockNumber'] === 'string' ? receipt['blockNumber'] : '0x0';
    const confirmations = blockNumber === '0x0' ? 0 : 1;

    return {
      verified: to === expectedTo && confirmations >= this.config.confirmationsRequired,
      confirmations,
      receivedAmount: String(input.expectedAmount),
      receivedCurrency: input.expectedCurrency,
      txHash: input.txHash,
      blockNumber: Number.parseInt(blockNumber, 16) || undefined,
    };
  }
}
