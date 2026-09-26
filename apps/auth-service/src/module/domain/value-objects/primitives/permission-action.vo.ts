/**
 * PermissionActionVO — Action segment of a permission
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export type PermissionActionValue =
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'manage'
  | 'approve'
  | 'export'
  | 'process'
  | 'refund'
  | 'cancel'
  | 'assign'
  | '*';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'view', 'create', 'update', 'delete', 'manage',
  'approve', 'export', 'process', 'refund',
  'cancel', 'assign', '*',
]);

export class PermissionActionVO extends BaseCodeVO {
  private constructor(value: PermissionActionValue) {
    super(value);
  }

  static of(raw: string): PermissionActionVO {
    const lower = raw.trim().toLowerCase();
    if (!ALLOWED.has(lower)) {
      throw new Error(`Unknown permission action: ${raw}`);
    }
    return new PermissionActionVO(lower as PermissionActionValue);
  }

  isWrite(): boolean {
    return this.value !== 'view' && this.value !== 'export' && this.value !== '*';
  }
}
