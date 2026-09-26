/**
 * IdGeneratorServiceInterface
 * @module auth-service/application/services/interfaces
 */
export interface IdGeneratorServiceInterface {
  readonly name: string;
  generate(): string;
  generateUuid(): string;
}
