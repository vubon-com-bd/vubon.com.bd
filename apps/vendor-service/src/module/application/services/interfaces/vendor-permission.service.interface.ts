import type { VendorPermissionEntity } from '../../../domain/entities/vendor-permission.entity';
import type { PermissionIdVO } from '../../../domain/value-objects/primitives/permission-id.vo';

export interface VendorPermissionServiceInterface {
  findById(id: PermissionIdVO): Promise<VendorPermissionEntity | null>;
  findAll(): Promise<readonly VendorPermissionEntity[]>;
  save(permission: VendorPermissionEntity): Promise<void>;
}
