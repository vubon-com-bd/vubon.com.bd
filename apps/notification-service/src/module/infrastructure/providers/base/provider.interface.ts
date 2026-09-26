import type { ProviderSendInput, ProviderSendResult } from './provider.types';

export interface ProviderInterface {
  readonly name: string;
  readonly channel: string;
  send(input: ProviderSendInput): Promise<ProviderSendResult>;
  isAvailable(): Promise<boolean>;
}
