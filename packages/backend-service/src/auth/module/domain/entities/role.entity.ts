// packages/backend-service/src/auth/module/domain/entities/role.entity.ts

// ✅ Shared packages
import type { DefaultRole } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';

/**
 * Role Entity
 * Represents a role with permissions and metadata
 * Roles have identity (name) and can change over time
 */
export class Role extends BaseEntity {
  private _name: DefaultRole;
  private _displayName: string;
  private _description: string;
  private _permissions: string[];
  private _isSystem: boolean;
  private _isActive: boolean;
  private _priority: number;
  private _color: string;
  private _icon: string | null;
  private _inheritsFrom: DefaultRole[];

  private constructor(
    id: string,
    name: DefaultRole,
    displayName: string,
    description: string,
    permissions: string[],
    isSystem: boolean,
    isActive: boolean,
    priority: number,
    color: string,
    icon: string | null = null,
    inheritsFrom: DefaultRole[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._displayName = displayName;
    this._description = description;
    this._permissions = permissions;
    this._isSystem = isSystem;
    this._isActive = isActive;
    this._priority = priority;
    this._color = color;
    this._icon = icon;
    this._inheritsFrom = inheritsFrom;
  }

  /**
   * Create a new role
   */
  static create(
    id: string,
    name: DefaultRole,
    displayName: string,
    description: string,
    permissions: string[] = [],
    isSystem: boolean = false,
    priority: number = 0,
    color: string = '#6B7280',
    icon: string | null = null,
    inheritsFrom: DefaultRole[] = []
  ): Role {
    const now = new Date();
    return new Role(
      id,
      name,
      displayName,
      description,
      permissions,
      isSystem,
      true,
      priority,
      color,
      icon,
      inheritsFrom,
      now,
      now
    );
  }

  /**
   * Reconstruct a role from persistence
   */
  static reconstruct(
    id: string,
    name: DefaultRole,
    displayName: string,
    description: string,
    permissions: string[],
    isSystem: boolean,
    isActive: boolean,
    priority: number,
    color: string,
    icon: string | null = null,
    inheritsFrom: DefaultRole[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ): Role {
    return new Role(
      id,
      name,
      displayName,
      description,
      permissions,
      isSystem,
      isActive,
      priority,
      color,
      icon,
      inheritsFrom,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get name(): DefaultRole {
    return this._name;
  }

  get displayName(): string {
    return this._displayName;
  }

  get description(): string {
    return this._description;
  }

  get permissions(): string[] {
    return [...this._permissions];
  }

  get isSystem(): boolean {
    return this._isSystem;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get priority(): number {
    return this._priority;
  }

  get color(): string {
    return this._color;
  }

  get icon(): string | null {
    return this._icon;
  }

  get inheritsFrom(): DefaultRole[] {
    return [...this._inheritsFrom];
  }

  /**
   * Check if the role has a specific permission
   */
  hasPermission(permission: string): boolean {
    if (!permission || typeof permission !== 'string') {
      return false;
    }
    return this._permissions.includes(permission);
  }

  /**
   * Check if the role has all of the specified permissions
   */
  hasAllPermissions(permissions: string[]): boolean {
    if (!permissions || permissions.length === 0) {
      return true;
    }
    return permissions.every((p) => this.hasPermission(p));
  }

  /**
   * Check if the role has any of the specified permissions
   */
  hasAnyPermission(permissions: string[]): boolean {
    if (!permissions || permissions.length === 0) {
      return false;
    }
    return permissions.some((p) => this.hasPermission(p));
  }

  /**
   * Add a permission to the role
   */
  addPermission(permission: string): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }

    if (!permission || typeof permission !== 'string') {
      throw new Error('Permission must be a non-empty string');
    }

    if (permission.length < 3) {
      throw new Error('Permission must be at least 3 characters');
    }

    if (this._permissions.includes(permission)) {
      throw new Error(`Permission "${permission}" already exists in this role`);
    }

    this._permissions.push(permission);
    this.touch();
  }

  /**
   * Add multiple permissions to the role
   */
  addPermissions(permissions: string[]): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }

    if (!permissions || permissions.length === 0) {
      throw new Error('At least one permission is required');
    }

    const newPermissions = permissions.filter((p) => !this._permissions.includes(p));
    if (newPermissions.length === 0) {
      throw new Error('No new permissions to add');
    }

    this._permissions.push(...newPermissions);
    this.touch();
  }

  /**
   * Remove a permission from the role
   */
  removePermission(permission: string): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }

    if (!permission || typeof permission !== 'string') {
      throw new Error('Permission must be a non-empty string');
    }

    const index = this._permissions.indexOf(permission);
    if (index === -1) {
      throw new Error(`Permission "${permission}" not found in this role`);
    }

    this._permissions.splice(index, 1);
    this.touch();
  }

  /**
   * Remove multiple permissions from the role
   */
  removePermissions(permissions: string[]): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }

    if (!permissions || permissions.length === 0) {
      throw new Error('At least one permission is required');
    }

    const removed: string[] = [];
    for (const permission of permissions) {
      const index = this._permissions.indexOf(permission);
      if (index !== -1) {
        this._permissions.splice(index, 1);
        removed.push(permission);
      }
    }

    if (removed.length === 0) {
      throw new Error('No permissions found to remove');
    }

    this.touch();
  }

  /**
   * Set permissions (replace all existing permissions)
   */
  setPermissions(permissions: string[]): void {
    if (this._isSystem) {
      throw new Error('Cannot modify permissions of a system role');
    }

    if (!permissions) {
      throw new Error('Permissions must be an array');
    }

    this._permissions = [...permissions];
    this.touch();
  }

  /**
   * Update role details
   */
  updateDetails(data: {
    displayName?: string;
    description?: string;
    priority?: number;
    color?: string;
    icon?: string | null;
  }): void {
    if (this._isSystem) {
      throw new Error('Cannot modify details of a system role');
    }

    if (data.displayName !== undefined) {
      if (!data.displayName || typeof data.displayName !== 'string') {
        throw new Error('Display name must be a non-empty string');
      }
      if (data.displayName.length > 50) {
        throw new Error('Display name cannot exceed 50 characters');
      }
      this._displayName = data.displayName;
    }

    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        throw new Error('Description must be a string');
      }
      if (data.description.length > 500) {
        throw new Error('Description cannot exceed 500 characters');
      }
      this._description = data.description;
    }

    if (data.priority !== undefined) {
      if (typeof data.priority !== 'number' || data.priority < 0) {
        throw new Error('Priority must be a non-negative number');
      }
      this._priority = data.priority;
    }

    if (data.color !== undefined) {
      if (!data.color || typeof data.color !== 'string') {
        throw new Error('Color must be a non-empty string');
      }
      if (!/^#[0-9A-Fa-f]{6}$/.test(data.color)) {
        throw new Error('Color must be a valid hex color code (e.g., #FF0000)');
      }
      this._color = data.color;
    }

    if (data.icon !== undefined) {
      if (data.icon !== null && typeof data.icon !== 'string') {
        throw new Error('Icon must be a string or null');
      }
      if (data.icon !== null && data.icon.length > 50) {
        throw new Error('Icon cannot exceed 50 characters');
      }
      this._icon = data.icon;
    }

    this.touch();
  }

  /**
   * Activate the role
   */
  activate(): void {
    if (this._isActive) {
      throw new Error('Role is already active');
    }
    this._isActive = true;
    this.touch();
  }

  /**
   * Deactivate the role
   */
  deactivate(): void {
    if (this._isSystem) {
      throw new Error('Cannot deactivate a system role');
    }

    if (!this._isActive) {
      throw new Error('Role is already inactive');
    }

    this._isActive = false;
    this.touch();
  }

  /**
   * Set inheritance from other roles
   */
  setInheritance(roles: DefaultRole[]): void {
    if (this._isSystem) {
      throw new Error('Cannot modify inheritance of a system role');
    }

    // Remove self from inheritance to prevent circular dependency
    this._inheritsFrom = roles.filter((role) => role !== this._name);
    this.touch();
  }

  /**
   * Add inheritance from another role
   */
  addInheritance(role: DefaultRole): void {
    if (this._isSystem) {
      throw new Error('Cannot modify inheritance of a system role');
    }

    if (role === this._name) {
      throw new Error('Cannot inherit from itself');
    }

    if (this._inheritsFrom.includes(role)) {
      throw new Error(`Already inherits from role "${role}"`);
    }

    this._inheritsFrom.push(role);
    this.touch();
  }

  /**
   * Remove inheritance from a role
   */
  removeInheritance(role: DefaultRole): void {
    if (this._isSystem) {
      throw new Error('Cannot modify inheritance of a system role');
    }

    const index = this._inheritsFrom.indexOf(role);
    if (index === -1) {
      throw new Error(`Does not inherit from role "${role}"`);
    }

    this._inheritsFrom.splice(index, 1);
    this.touch();
  }

  /**
   * Check if role is a system role
   */
  isSystemRole(): boolean {
    return this._isSystem;
  }

  /**
   * Get all permissions including inherited ones
   */
  getAllPermissions(): string[] {
    const allPermissions = new Set<string>();

    // Add direct permissions
    for (const permission of this._permissions) {
      allPermissions.add(permission);
    }

    // Add inherited permissions
    // In a real implementation, this would recursively fetch from parent roles
    // For now, we just return direct permissions plus a placeholder
    // The actual implementation should use a role repository to fetch parent roles

    return Array.from(allPermissions);
  }

  /**
   * Get the role's priority label
   */
  getPriorityLabel(): string {
    if (this._priority >= 100) return 'Highest';
    if (this._priority >= 80) return 'High';
    if (this._priority >= 50) return 'Medium';
    if (this._priority >= 20) return 'Low';
    return 'Lowest';
  }

  /**
   * Get role summary
   */
  getSummary(): {
    id: string;
    name: DefaultRole;
    displayName: string;
    description: string;
    permissions: string[];
    isSystem: boolean;
    isActive: boolean;
    priority: number;
    priorityLabel: string;
    color: string;
    icon: string | null;
    inheritsFrom: DefaultRole[];
    permissionCount: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      name: this._name,
      displayName: this._displayName,
      description: this._description,
      permissions: this._permissions,
      isSystem: this._isSystem,
      isActive: this._isActive,
      priority: this._priority,
      priorityLabel: this.getPriorityLabel(),
      color: this._color,
      icon: this._icon,
      inheritsFrom: this._inheritsFrom,
      permissionCount: this._permissions.length,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two Role entities
   */
  equals(other: Role | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof Role)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `Role(id=${this.id}, name=${this._name}, isSystem=${this._isSystem}, isActive=${this._isActive})`;
  }
}
