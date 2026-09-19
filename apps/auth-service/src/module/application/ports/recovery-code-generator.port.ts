/**
 * Recovery Code Generator Port
 * Application-layer contract for recovery code generation.
 * Implementation lives in infrastructure layer (crypto).
 */
export interface RecoveryCodeGeneratorPort {
  generate(count: number): readonly string[];
  normalize(code: string): string;
}
