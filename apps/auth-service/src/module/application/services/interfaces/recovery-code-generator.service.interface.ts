/**
 * RecoveryCodeGeneratorServiceInterface
 * @module auth-service/application/services/interfaces
 */
export interface RecoveryCodeGeneratorServiceInterface {
  readonly name: string;
  generate(count: number): Promise<readonly string[]>;
  hash(code: string): Promise<string>;
  verify(code: string, hash: string): Promise<boolean>;
}
