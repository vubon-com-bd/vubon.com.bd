/**
 * Base Controller
 * @module shared-kernel/interfaces/controllers
 *
 * Helper methods for extracting user context in controllers.
 */
import type { CurrentUserShape } from '../decorators/current-user.decorator';

export abstract class BaseController {
  /**
   * Returns current authenticated user.
   * Override in subclass or pass user explicitly from @CurrentUser().
   */
  protected currentUser(): CurrentUserShape | null {
    return null;
  }

  protected currentUserId(): string {
    const user = this.currentUser();
    if (!user) {
      throw new Error('Current user not available in controller context');
    }
    return user.userId;
  }

  protected currentSessionId(): string | undefined {
    return this.currentUser()?.sessionId;
  }

  protected hasRole(role: string): boolean {
    return BaseController.userHasRole(this.currentUser(), role);
  }

  protected hasAnyRole(roles: readonly string[]): boolean {
    return BaseController.userHasAnyRole(this.currentUser(), roles);
  }

  protected hasAllRoles(roles: readonly string[]): boolean {
    return BaseController.userHasAllRoles(this.currentUser(), roles);
  }

  protected hasPermission(permission: string): boolean {
    return BaseController.userHasPermission(this.currentUser(), permission);
  }

  protected hasAnyPermission(permissions: readonly string[]): boolean {
    return BaseController.userHasAnyPermission(this.currentUser(), permissions);
  }

  protected hasAllPermissions(permissions: readonly string[]): boolean {
    return BaseController.userHasAllPermissions(this.currentUser(), permissions);
  }

  protected isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // ═══════════════════════════════════════════════════════
  // Static helpers — use with @CurrentUser() injected user
  // ═══════════════════════════════════════════════════════

  static userHasRole(user: CurrentUserShape | null, role: string): boolean {
    return user?.roles?.includes(role) ?? false;
  }

  static userHasAnyRole(
    user: CurrentUserShape | null,
    roles: readonly string[],
  ): boolean {
    if (!user?.roles) return false;
    return roles.some((role) => user.roles?.includes(role) ?? false);
  }

  static userHasAllRoles(
    user: CurrentUserShape | null,
    roles: readonly string[],
  ): boolean {
    if (!user?.roles) return false;
    return roles.every((role) => user.roles?.includes(role) ?? false);
  }

  static userHasPermission(
    user: CurrentUserShape | null,
    permission: string,
  ): boolean {
    return user?.permissions?.includes(permission) ?? false;
  }

  static userHasAnyPermission(
    user: CurrentUserShape | null,
    permissions: readonly string[],
  ): boolean {
    if (!user?.permissions) return false;
    return permissions.some((perm) => user.permissions?.includes(perm) ?? false);
  }

  static userHasAllPermissions(
    user: CurrentUserShape | null,
    permissions: readonly string[],
  ): boolean {
    if (!user?.permissions) return false;
    return permissions.every((perm) => user.permissions?.includes(perm) ?? false);
  }

  static isUserAuthenticated(user: CurrentUserShape | null): boolean {
    return user !== null && user !== undefined;
  }
}
