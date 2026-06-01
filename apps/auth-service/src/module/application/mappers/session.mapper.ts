/**
 * Session Mapper - Pure Entity to DTO Conversion
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/mappers/session.mapper
 * 
 * @description
 * Mapper for converting Session entity to various DTO formats.
 * NO business logic, NO validation, NO repository calls.
 * 
 * Enterprise Rules:
 * ✅ ONLY entity to DTO conversion
 * ✅ Stateless static methods
 * ✅ Type-safe with DTO interfaces
 * ✅ Handles null/undefined gracefully
 * ✅ No side effects
 * ✅ Bangladesh specific - Network type, mobile operator, district fields
 */

import { Session, SessionStatus, SessionMetadata } from '../../domain/entities/session.entity';
import { IpAddress, IpCategory } from '../../domain/value-objects/ip-address.vo';
import { UserAgent, DeviceType } from '../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../domain/value-objects/device-id.vo';

// ============================================================
// DTO Interfaces
// ============================================================

/**
 * Full Session Response DTO
 */
export interface SessionResponseDto {
  id: string;
  userId: string;
  ipAddress: string;
  ipCategory: string;
  userAgent: string;
  deviceId: string;
  deviceName?: string;
  deviceType: string;
  location?: string;
  district?: string;
  upazila?: string;
  status: string;
  isActive: boolean;
  isExpired: boolean;
  isRevoked: boolean;
  isSuspended: boolean;
  isCurrent: boolean;
  trustLevel: string;
  networkType?: string;
  mobileOperator?: string;
  expiresAt: string;
  remainingTimeSeconds: number;
  remainingTimeFormatted: string;
  lastActivityAt: string;
  lastActivityUrl?: string;
  idleTimeMinutes: number;
  createdAt: string;
  absoluteTimeoutAt?: string;
  idleTimeoutAt?: string;
}

/**
 * Brief Session Response DTO (for session lists)
 */
export interface BriefSessionResponseDto {
  id: string;
  userId: string;
  deviceId: string;
  deviceName?: string;
  deviceType: string;
  location?: string;
  district?: string;
  status: string;
  isActive: boolean;
  isCurrent: boolean;
  trustLevel: string;
  lastActivityAt: string;
  idleTimeMinutes: number;
  expiresAt: string;
  remainingTimeSeconds: number;
  networkType?: string;
  mobileOperator?: string;
}

/**
 * Current Session Response DTO (for /me endpoint)
 */
export interface CurrentSessionResponseDto {
  id: string;
  userId: string;
  deviceId: string;
  deviceName?: string;
  deviceType: string;
  ipAddress: string;
  ipCategory: string;
  location?: string;
  district?: string;
  upazila?: string;
  userAgent: string;
  trustLevel: string;
  networkType?: string;
  mobileOperator?: string;
  expiresAt: string;
  remainingTimeSeconds: number;
  remainingTimeFormatted: string;
  lastActivityAt: string;
  lastActivityUrl?: string;
  idleTimeMinutes: number;
  idleTimeoutAt: string;
  absoluteTimeoutAt: string;
}

/**
 * Session Statistics DTO
 */
export interface SessionStatisticsDto {
  totalSessions: number;
  activeSessions: number;
  expiredSessions: number;
  revokedSessions: number;
  suspendedSessions: number;
  averageSessionDurationHours: number;
  mostUsedDeviceId: string | null;
  mostUsedDeviceType: string | null;
  mostUsedNetworkType?: string;
  mostUsedMobileOperator?: string;
  mostActiveDistrict?: string;
  sessionsByDeviceType: Record<string, number>;
  sessionsByNetworkType: Record<string, number>;
  sessionsByMobileOperator: Record<string, number>;
  sessionsByDistrict: Array<{ district: string; count: number }>;
}

// ============================================================
// Session Mapper
// ============================================================

/**
 * Session Mapper - Pure conversion methods
 */
export class SessionMapper {
  /**
   * Calculate remaining time in seconds
   * @param session - Session entity
   * @returns Remaining time in seconds (0 if expired)
   */
  private static getRemainingTimeSeconds(session: Session): number {
    if (!session.isActive()) {
      return 0;
    }
    const remaining = session.getRemainingTimeMs();
    return Math.max(0, Math.floor(remaining / 1000));
  }
  
  /**
   * Format remaining time for display
   * @param session - Session entity
   * @returns Formatted remaining time string
   */
  private static getRemainingTimeFormatted(session: Session): string {
    if (!session.isActive()) {
      return 'Expired';
    }
    return session.getRemainingTimeFormatted();
  }
  
  /**
   * Calculate idle time in minutes
   * @param session - Session entity
   * @returns Idle time in minutes
   */
  private static getIdleTimeMinutes(session: Session): number {
    return session.getIdleTimeMinutes();
  }
  
  /**
   * Get device type from user agent
   * @param session - Session entity
   * @returns Device type string
   */
  private static getDeviceType(session: Session): string {
    const deviceType = session.getUserAgent().getDeviceType();
    switch (deviceType) {
      case DeviceType.MOBILE:
        return 'mobile';
      case DeviceType.TABLET:
        return 'tablet';
      case DeviceType.DESKTOP:
        return 'desktop';
      case DeviceType.LAPTOP:
        return 'laptop';
      case DeviceType.TV:
        return 'tv';
      case DeviceType.CONSOLE:
        return 'console';
      case DeviceType.WEARABLE:
        return 'wearable';
      case DeviceType.FEATURE_PHONE:
        return 'feature_phone';
      default:
        return 'unknown';
    }
  }
  
  /**
   * Get IP category
   * @param session - Session entity
   * @returns IP category string
   */
  private static getIpCategory(session: Session): string {
    const category = session.getIpAddress().getCategory();
    switch (category) {
      case IpCategory.PUBLIC:
        return 'public';
      case IpCategory.PRIVATE:
        return 'private';
      case IpCategory.LOOPBACK:
        return 'loopback';
      case IpCategory.LINK_LOCAL:
        return 'link_local';
      case IpCategory.MULTICAST:
        return 'multicast';
      case IpCategory.RESERVED:
        return 'reserved';
      case IpCategory.CLOUD:
        return 'cloud';
      case IpCategory.BANGLADESH_ISP:
        return 'bangladesh_isp';
      default:
        return 'unknown';
    }
  }
  
  /**
   * Get metadata value safely
   */
  private static getMetadataValue<T>(
    metadata: SessionMetadata | undefined,
    key: keyof SessionMetadata,
    defaultValue: T
  ): T {
    if (!metadata) return defaultValue;
    const value = metadata[key];
    return (value !== undefined && value !== null) ? value as T : defaultValue;
  }
  
  /**
   * Convert Session entity to Full Response DTO
   * @param session - Session entity (can be null)
   * @returns SessionResponseDto or null
   */
  static toDto(session: Session | null | undefined): SessionResponseDto | null {
    if (!session) {
      return null;
    }
    
    const metadata = session.getMetadata();
    const isActive = session.isActive();
    const isExpired = session.isExpired();
    const isRevoked = session.isRevoked();
    const isSuspended = session.isSuspended();
    
    return {
      id: session.getId(),
      userId: session.getUserId(),
      ipAddress: session.getIpAddress().getValue(),
      ipCategory: this.getIpCategory(session),
      userAgent: session.getUserAgent().getValue(),
      deviceId: session.getDeviceId().getValue(),
      deviceName: session.getSessionName(),
      deviceType: this.getDeviceType(session),
      location: session.getLocation(),
      district: this.getMetadataValue(metadata, 'district', undefined),
      upazila: this.getMetadataValue(metadata, 'upazila', undefined),
      status: session.getStatus(),
      isActive,
      isExpired,
      isRevoked,
      isSuspended,
      isCurrent: session.isCurrent(),
      trustLevel: this.getMetadataValue(metadata, 'trustLevel', 'standard'),
      networkType: this.getMetadataValue(metadata, 'networkType', undefined),
      mobileOperator: this.getMetadataValue(metadata, 'mobileOperator', undefined),
      expiresAt: session.getExpiresAt().toISOString(),
      remainingTimeSeconds: this.getRemainingTimeSeconds(session),
      remainingTimeFormatted: this.getRemainingTimeFormatted(session),
      lastActivityAt: session.getLastActivityAt().toISOString(),
      lastActivityUrl: session.getLastActivityUrl(),
      idleTimeMinutes: this.getIdleTimeMinutes(session),
      createdAt: session.getCreatedAt().toISOString(),
      absoluteTimeoutAt: session.getAbsoluteTimeoutAt().toISOString(),
      idleTimeoutAt: session.getIdleTimeoutAt().toISOString(),
    };
  }
  
  /**
   * Convert Session entity to Brief Response DTO
   * @param session - Session entity (can be null)
   * @returns BriefSessionResponseDto or null
   */
  static toBriefDto(session: Session | null | undefined): BriefSessionResponseDto | null {
    if (!session) {
      return null;
    }
    
    const metadata = session.getMetadata();
    const isActive = session.isActive();
    
    return {
      id: session.getId(),
      userId: session.getUserId(),
      deviceId: session.getDeviceId().getValue(),
      deviceName: session.getSessionName(),
      deviceType: this.getDeviceType(session),
      location: session.getLocation(),
      district: this.getMetadataValue(metadata, 'district', undefined),
      status: session.getStatus(),
      isActive,
      isCurrent: session.isCurrent(),
      trustLevel: this.getMetadataValue(metadata, 'trustLevel', 'standard'),
      lastActivityAt: session.getLastActivityAt().toISOString(),
      idleTimeMinutes: this.getIdleTimeMinutes(session),
      expiresAt: session.getExpiresAt().toISOString(),
      remainingTimeSeconds: this.getRemainingTimeSeconds(session),
      networkType: this.getMetadataValue(metadata, 'networkType', undefined),
      mobileOperator: this.getMetadataValue(metadata, 'mobileOperator', undefined),
    };
  }
  
  /**
   * Convert Session entity to Current Session Response DTO
   * @param session - Session entity
   * @returns CurrentSessionResponseDto
   */
  static toCurrentSessionDto(session: Session): CurrentSessionResponseDto {
    const metadata = session.getMetadata();
    
    return {
      id: session.getId(),
      userId: session.getUserId(),
      deviceId: session.getDeviceId().getValue(),
      deviceName: session.getSessionName(),
      deviceType: this.getDeviceType(session),
      ipAddress: session.getIpAddress().getValue(),
      ipCategory: this.getIpCategory(session),
      location: session.getLocation(),
      district: this.getMetadataValue(metadata, 'district', undefined),
      upazila: this.getMetadataValue(metadata, 'upazila', undefined),
      userAgent: session.getUserAgent().getValue(),
      trustLevel: this.getMetadataValue(metadata, 'trustLevel', 'standard'),
      networkType: this.getMetadataValue(metadata, 'networkType', undefined),
      mobileOperator: this.getMetadataValue(metadata, 'mobileOperator', undefined),
      expiresAt: session.getExpiresAt().toISOString(),
      remainingTimeSeconds: this.getRemainingTimeSeconds(session),
      remainingTimeFormatted: this.getRemainingTimeFormatted(session),
      lastActivityAt: session.getLastActivityAt().toISOString(),
      lastActivityUrl: session.getLastActivityUrl(),
      idleTimeMinutes: this.getIdleTimeMinutes(session),
      idleTimeoutAt: session.getIdleTimeoutAt().toISOString(),
      absoluteTimeoutAt: session.getAbsoluteTimeoutAt().toISOString(),
    };
  }
  
  /**
   * Convert Session entity list to DTO list
   * @param sessions - Array of Session entities
   * @returns Array of SessionResponseDto
   */
  static toDtoList(sessions: Session[]): SessionResponseDto[] {
    if (!sessions || sessions.length === 0) {
      return [];
    }
    return sessions
      .map(session => this.toDto(session))
      .filter((dto): dto is SessionResponseDto => dto !== null);
  }
  
  /**
   * Convert Session entity list to Brief DTO list
   * @param sessions - Array of Session entities
   * @returns Array of BriefSessionResponseDto
   */
  static toBriefDtoList(sessions: Session[]): BriefSessionResponseDto[] {
    if (!sessions || sessions.length === 0) {
      return [];
    }
    return sessions
      .map(session => this.toBriefDto(session))
      .filter((dto): dto is BriefSessionResponseDto => dto !== null);
  }
  
  /**
   * Create paginated response from sessions and total
   * @param sessions - Array of Session entities
   * @param total - Total count
   * @param page - Current page
   * @param limit - Items per page
   * @returns Paginated response object
   */
  static toPaginatedResponse(
    sessions: Session[],
    total: number,
    page: number,
    limit: number
  ): {
    items: BriefSessionResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } {
    const items = this.toBriefDtoList(sessions);
    const totalPages = Math.ceil(total / limit);
    
    return {
      items,
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
  
  /**
   * Create session statistics DTO
   * @param sessions - Array of Session entities
   * @returns SessionStatisticsDto
   */
  static toStatisticsDto(sessions: Session[]): SessionStatisticsDto {
    const activeSessions = sessions.filter(s => s.isActive());
    const expiredSessions = sessions.filter(s => s.isExpired());
    const revokedSessions = sessions.filter(s => s.isRevoked());
    const suspendedSessions = sessions.filter(s => s.isSuspended());
    
    // Calculate average duration
    let totalDurationHours = 0;
    for (const session of sessions) {
      const durationMs = session.getExpiresAt().getTime() - session.getCreatedAt().getTime();
      totalDurationHours += durationMs / (1000 * 60 * 60);
    }
    const averageDurationHours = sessions.length > 0 ? totalDurationHours / sessions.length : 0;
    
    // Count by device type
    const sessionsByDeviceType: Record<string, number> = {};
    const sessionsByNetworkType: Record<string, number> = {};
    const sessionsByMobileOperator: Record<string, number> = {};
    const sessionsByDistrict: Record<string, number> = {};
    
    let mostUsedDeviceId: string | null = null;
    let mostUsedDeviceType: string | null = null;
    let mostUsedNetworkType: string | null = null;
    let mostUsedMobileOperator: string | null = null;
    let mostActiveDistrict: string | null = null;
    
    const deviceIdCount: Record<string, number> = {};
    const deviceTypeCount: Record<string, number> = {};
    const networkTypeCount: Record<string, number> = {};
    const mobileOperatorCount: Record<string, number> = {};
    const districtCount: Record<string, number> = {};
    
    for (const session of sessions) {
      const deviceId = session.getDeviceId().getValue();
      deviceIdCount[deviceId] = (deviceIdCount[deviceId] || 0) + 1;
      if (deviceIdCount[deviceId] > (deviceIdCount[mostUsedDeviceId || ''] || 0)) {
        mostUsedDeviceId = deviceId;
      }
      
      const deviceType = this.getDeviceType(session);
      deviceTypeCount[deviceType] = (deviceTypeCount[deviceType] || 0) + 1;
      sessionsByDeviceType[deviceType] = (sessionsByDeviceType[deviceType] || 0) + 1;
      if (deviceTypeCount[deviceType] > (deviceTypeCount[mostUsedDeviceType || ''] || 0)) {
        mostUsedDeviceType = deviceType;
      }
      
      const metadata = session.getMetadata();
      const networkType = this.getMetadataValue(metadata, 'networkType', undefined);
      if (networkType) {
        networkTypeCount[networkType] = (networkTypeCount[networkType] || 0) + 1;
        sessionsByNetworkType[networkType] = (sessionsByNetworkType[networkType] || 0) + 1;
        if (networkTypeCount[networkType] > (networkTypeCount[mostUsedNetworkType || ''] || 0)) {
          mostUsedNetworkType = networkType;
        }
      }
      
      const mobileOperator = this.getMetadataValue(metadata, 'mobileOperator', undefined);
      if (mobileOperator) {
        mobileOperatorCount[mobileOperator] = (mobileOperatorCount[mobileOperator] || 0) + 1;
        sessionsByMobileOperator[mobileOperator] = (sessionsByMobileOperator[mobileOperator] || 0) + 1;
        if (mobileOperatorCount[mobileOperator] > (mobileOperatorCount[mostUsedMobileOperator || ''] || 0)) {
          mostUsedMobileOperator = mobileOperator;
        }
      }
      
      const district = this.getMetadataValue(metadata, 'district', undefined);
      if (district) {
        districtCount[district] = (districtCount[district] || 0) + 1;
        sessionsByDistrict[district] = (sessionsByDistrict[district] || 0) + 1;
        if (districtCount[district] > (districtCount[mostActiveDistrict || ''] || 0)) {
          mostActiveDistrict = district;
        }
      }
    }
    
    return {
      totalSessions: sessions.length,
      activeSessions: activeSessions.length,
      expiredSessions: expiredSessions.length,
      revokedSessions: revokedSessions.length,
      suspendedSessions: suspendedSessions.length,
      averageSessionDurationHours: averageDurationHours,
      mostUsedDeviceId,
      mostUsedDeviceType,
      mostUsedNetworkType,
      mostUsedMobileOperator,
      mostActiveDistrict,
      sessionsByDeviceType,
      sessionsByNetworkType,
      sessionsByMobileOperator,
      sessionsByDistrict: Object.entries(sessionsByDistrict).map(([district, count]) => ({ district, count })),
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SessionStatisticsDto as SessionStatisticsDtoType,
  SessionResponseDto as SessionResponseDtoType,
  BriefSessionResponseDto as BriefSessionResponseDtoType,
  CurrentSessionResponseDto as CurrentSessionResponseDtoType
};
