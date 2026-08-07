// packages/backend-service/src/auth/module/domain/entities/permission.entity.ts

// ✅ Shared packages
import type { PermissionResource } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';

/**
 * Permission Category Type (local definition)
 * Since PermissionCategory is not exported from shared-types, we define it locally
 * This matches the PermissionResource type from shared-types
 */
export type PermissionCategory = PermissionResource;

/**
 * Permission Entity
 * Represents a permission with metadata and status
 * Permissions have identity (name) and can change over time
 */
export class Permission extends BaseEntity {
  private _key: string;
  private _name: string;
  private _description: string;
  private _category: PermissionCategory;
  private _isSystem: boolean;
  private _isDeprecated: boolean;
  private _deprecatedAt: Date | null;
  private _deprecationReason: string | null;
  private _enabledByDefault: boolean;
  private _dependsOn: string[];

  private constructor(
    id: string,
    key: string,
    name: string,
    description: string,
    category: PermissionCategory,
    isSystem: boolean,
    isDeprecated: boolean,
    enabledByDefault: boolean,
    dependsOn: string[] = [],
    deprecatedAt: Date | null = null,
    deprecationReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._key = key;
    this._name = name;
    this._description = description;
    this._category = category;
    this._isSystem = isSystem;
    this._isDeprecated = isDeprecated;
    this._deprecatedAt = deprecatedAt;
    this._deprecationReason = deprecationReason;
    this._enabledByDefault = enabledByDefault;
    this._dependsOn = dependsOn;
  }

  /**
   * Create a new permission
   */
  static create(
    id: string,
    key: string,
    name: string,
    description: string,
    category: PermissionCategory,
    isSystem: boolean = false,
    enabledByDefault: boolean = false,
    dependsOn: string[] = []
  ): Permission {
    const now = new Date();
    return new Permission(
      id,
      key,
      name,
      description,
      category,
      isSystem,
      false,
      enabledByDefault,
      dependsOn,
      null,
      null,
      now,
      now
    );
  }

  /**
   * Reconstruct a permission from persistence
   */
  static reconstruct(
    id: string,
    key: string,
    name: string,
    description: string,
    category: PermissionCategory,
    isSystem: boolean,
    isDeprecated: boolean,
    enabledByDefault: boolean,
    dependsOn: string[] = [],
    deprecatedAt: Date | null = null,
    deprecationReason: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ): Permission {
    return new Permission(
      id,
      key,
      name,
      description,
      category,
      isSystem,
      isDeprecated,
      enabledByDefault,
      dependsOn,
      deprecatedAt,
      deprecationReason,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get key(): string {
    return this._key;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get category(): PermissionCategory {
    return this._category;
  }

  get isSystem(): boolean {
    return this._isSystem;
  }

  get isDeprecated(): boolean {
    return this._isDeprecated;
  }

  get deprecatedAt(): Date | null {
    return this._deprecatedAt ? new Date(this._deprecatedAt) : null;
  }

  get deprecationReason(): string | null {
    return this._deprecationReason;
  }

  get enabledByDefault(): boolean {
    return this._enabledByDefault;
  }

  get dependsOn(): string[] {
    return [...this._dependsOn];
  }

  /**
   * Check if the permission is active (not deprecated)
   */
  isActive(): boolean {
    return !this._isDeprecated;
  }

  /**
   * Update the permission description
   */
  updateDescription(newDescription: string): void {
    if (!newDescription || typeof newDescription !== 'string') {
      throw new Error('Description must be a non-empty string');
    }

    if (newDescription.length > 500) {
      throw new Error('Description cannot exceed 500 characters');
    }

    this._description = newDescription;
    this.touch();
  }

  /**
   * Update the permission name
   */
  updateName(newName: string): void {
    if (this._isSystem) {
      throw new Error('Cannot update name of a system permission');
    }

    if (!newName || typeof newName !== 'string') {
      throw new Error('Name must be a non-empty string');
    }

    if (newName.length > 100) {
      throw new Error('Name cannot exceed 100 characters');
    }

    this._name = newName;
    this.touch();
  }

  /**
   * Update the permission category
   */
  updateCategory(newCategory: PermissionCategory): void {
    if (!newCategory || typeof newCategory !== 'string') {
      throw new Error('Category must be a non-empty string');
    }

    this._category = newCategory;
    this.touch();
  }

  /**
   * Deprecate the permission
   */
  deprecate(reason: string = 'Permission is deprecated'): void {
    if (this._isDeprecated) {
      throw new Error('Permission is already deprecated');
    }

    if (this._isSystem) {
      throw new Error('Cannot deprecate a system permission');
    }

    if (!reason || typeof reason !== 'string') {
      throw new Error('Deprecation reason must be a non-empty string');
    }

    if (reason.length > 500) {
      throw new Error('Deprecation reason cannot exceed 500 characters');
    }

    this._isDeprecated = true;
    this._deprecatedAt = new Date();
    this._deprecationReason = reason;
    this.touch();
  }

  /**
   * Undeprecate the permission
   */
  undeprecate(): void {
    if (!this._isDeprecated) {
      throw new Error('Permission is not deprecated');
    }

    if (this._isSystem) {
      throw new Error('Cannot undeprecate a system permission');
    }

    this._isDeprecated = false;
    this._deprecatedAt = null;
    this._deprecationReason = null;
    this.touch();
  }

  /**
   * Add a dependency on another permission
   */
  addDependency(permissionKey: string): void {
    if (!permissionKey || typeof permissionKey !== 'string') {
      throw new Error('Permission key must be a non-empty string');
    }

    if (permissionKey === this._key) {
      throw new Error('Cannot depend on itself');
    }

    if (this._dependsOn.includes(permissionKey)) {
      throw new Error(`Already depends on permission "${permissionKey}"`);
    }

    this._dependsOn.push(permissionKey);
    this.touch();
  }

  /**
   * Remove a dependency on another permission
   */
  removeDependency(permissionKey: string): void {
    if (!permissionKey || typeof permissionKey !== 'string') {
      throw new Error('Permission key must be a non-empty string');
    }

    const index = this._dependsOn.indexOf(permissionKey);
    if (index === -1) {
      throw new Error(`Does not depend on permission "${permissionKey}"`);
    }

    this._dependsOn.splice(index, 1);
    this.touch();
  }

  /**
   * Set dependencies (replace all existing dependencies)
   */
  setDependencies(permissionKeys: string[]): void {
    if (permissionKeys.includes(this._key)) {
      throw new Error('Cannot depend on itself');
    }

    this._dependsOn = [...permissionKeys];
    this.touch();
  }

  /**
   * Check if the permission has a specific dependency
   */
  hasDependency(permissionKey: string): boolean {
    return this._dependsOn.includes(permissionKey);
  }

  /**
   * Get the category label
   */
  getCategoryLabel(): string {
    const categoryLabels: Record<PermissionCategory, string> = {
      auth: 'Authentication',
      user: 'User Management',
      role: 'Role Management',
      permission: 'Permission Management',
      product: 'Product Management',
      order: 'Order Management',
      payment: 'Payment Management',
      analytics: 'Analytics & Reports',
      settings: 'Settings',
      content: 'Content Management',
      notification: 'Notifications',
      support: 'Support',
      system: 'System',
      file: 'File Management',
      report: 'Reports',
      integration: 'Integrations',
    };
    return categoryLabels[this._category] || this._category;
  }

  /**
   * Check if the permission is a system permission
   */
  isSystemPermission(): boolean {
    return this._isSystem;
  }

  /**
   * Get permission summary
   */
  getSummary(): {
    id: string;
    key: string;
    name: string;
    description: string;
    category: PermissionCategory;
    categoryLabel: string;
    isSystem: boolean;
    isActive: boolean;
    isDeprecated: boolean;
    deprecatedAt: Date | null;
    deprecationReason: string | null;
    enabledByDefault: boolean;
    dependsOn: string[];
    dependencyCount: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      key: this._key,
      name: this._name,
      description: this._description,
      category: this._category,
      categoryLabel: this.getCategoryLabel(),
      isSystem: this._isSystem,
      isActive: this.isActive(),
      isDeprecated: this._isDeprecated,
      deprecatedAt: this._deprecatedAt,
      deprecationReason: this._deprecationReason,
      enabledByDefault: this._enabledByDefault,
      dependsOn: this._dependsOn,
      dependencyCount: this._dependsOn.length,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two Permission entities
   */
  equals(other: Permission | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Permission)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `Permission(id=${this.id}, key=${this._key}, category=${this._category}, isSystem=${this._isSystem}, isDeprecated=${this._isDeprecated})`;
  }
}
