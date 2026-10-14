/**
 * VendorPermissionEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorPermissionVO,
  type VendorPermissionVOProps,
} from '../value-objects/composites/vendor-permission.vo.js';

export interface VendorPermissionEntityProps {
  readonly vo: VendorPermissionVO;
}

export class VendorPermissionEntity extends BaseEntity<string> {
  private _vo: VendorPermissionVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorPermissionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorPermissionVO { return this._vo; }
  get permissionId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get memberId() { return this._vo.memberId; }
  get role() { return this._vo.role; }
  get permissions(): readonly string[] { return this._vo.permissions; }
  get overrides(): readonly string[] { return this._vo.overrides; }
  get denials(): readonly string[] { return this._vo.denials; }
  get grantedAt(): string { return this._vo.grantedAt; }
  get grantedBy(): string | undefined { return this._vo.grantedBy; }
  get effectivePermissions(): readonly string[] { return this._vo.effectivePermissions; }
  get effectiveCount(): number { return this._vo.effectiveCount; }

  // ═══ Predicates ═══
  isOwner(): boolean { return this._vo.isOwner(); }
  isManager(): boolean { return this._vo.isManager(); }
  isViewer(): boolean { return this._vo.isViewer(); }
  hasAnyOverrides(): boolean { return this._vo.hasAnyOverrides(); }
  hasAnyDenials(): boolean { return this._vo.hasAnyDenials(); }

  hasPermission(permission: string): boolean { return this._vo.hasPermission(permission); }
  hasAnyPermission(permissions: readonly string[]): boolean {
    return this._vo.hasAnyPermission(permissions);
  }
  hasAllPermissions(permissions: readonly string[]): boolean {
    return this._vo.hasAllPermissions(permissions);
  }

  hasNamespace(namespace: string): boolean { return this._vo.hasNamespace(namespace); }
  getPermissionsInNamespace(namespace: string): readonly string[] {
    return this._vo.getPermissionsInNamespace(namespace);
  }

  // ═══ Business Actions ═══
  grantPermission(permission: string, now: string = new Date().toISOString()): void {
    if (this.hasPermission(permission)) return;
    if (!/^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/.test(permission)) {
      throw new ValidationError(
        'Permission must match "namespace:resource:action"',
        'permissions',
      );
    }
    const current = this._vo.value;
    this._vo = VendorPermissionVO.create({
      ...current,
      overrides: [...current.overrides, permission],
    });
    this.touch(now);
  }

  revokePermission(permission: string, now: string = new Date().toISOString()): void {
    if (this.hasDenial(permission)) return;
    if (!/^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/.test(permission)) {
      throw new ValidationError(
        'Permission must match "namespace:resource:action"',
        'denials',
      );
    }
    const current = this._vo.value;
    const newOverrides = current.overrides.filter((p) => p !== permission);
    this._vo = VendorPermissionVO.create({
      ...current,
      overrides: newOverrides,
      denials: [...current.denials, permission],
    });
    this.touch(now);
  }

  removeDenial(permission: string, now: string = new Date().toISOString()): void {
    if (!this.hasDenial(permission)) return;
    const current = this._vo.value;
    this._vo = VendorPermissionVO.create({
      ...current,
      denials: current.denials.filter((p) => p !== permission),
    });
    this.touch(now);
  }

  hasDenial(permission: string): boolean {
    return this.denials.includes(permission);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorPermissionVO;
    now: string;
  }): VendorPermissionEntity {
    return new VendorPermissionEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorPermissionEntityProps;
  }): VendorPermissionEntity {
    return new VendorPermissionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
