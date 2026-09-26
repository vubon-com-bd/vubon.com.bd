import { EventEntity } from '../entities/event.entity';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo';

export interface EnrichmentContext {
  readonly ip?: string;
  readonly country?: string;
  readonly deviceType?: string;
  readonly userAgent?: string;
}

export interface DeviceInfo {
  readonly browser: string | null;
  readonly os: string | null;
  readonly isMobile: boolean;
  readonly isBot: boolean;
}

export class EventEnrichmentService {
  /**
   * Enrich event payload with derived/geo/device metadata.
   */
  enrich(event: EventEntity, context: EnrichmentContext): EventEntity {
    const existing = event.payload.toObject();
    const deviceInfo = this.parseDevice(context.userAgent);
    const geo = this.deriveGeo(context.ip, context.country);
    const botScore = this.botScore(context.userAgent, context.ip);

    const enriched: Record<string, unknown> = {
      ...existing,
      _enriched: {
        ip: context.ip ?? null,
        country: geo.country,
        region: geo.region,
        deviceType: context.deviceType ?? this.inferDeviceType(deviceInfo),
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        isMobile: deviceInfo.isMobile,
        isBot: deviceInfo.isBot,
        botScore,
        enrichedAt: new Date().toISOString(),
      },
    };

    return EventEntity.reconstitute(
      event.id,
      {
        name: event.name,
        source: event.source,
        timestamp: event.timestamp,
        payload: EventPayloadVO.create(enriched),
        processed: event.processed,
      },
      event.createdAt,
      new Date().toISOString(),
      event.deletedAt ?? null,
    );
  }

  private parseDevice(userAgent: string | undefined): DeviceInfo {
    if (!userAgent) {
      return { browser: null, os: null, isMobile: false, isBot: false };
    }
    const ua = userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    const isBot = /bot|crawler|spider|scraper/i.test(ua);

    let browser: string | null = null;
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/Chrome\//.test(ua) && !/Edg/.test(ua)) browser = 'Chrome';
    else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';

    let os: string | null = null;
    if (/Windows NT/.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS X/.test(ua)) os = 'macOS';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    return { browser, os, isMobile, isBot };
  }

  private deriveGeo(
    ip: string | undefined,
    explicitCountry: string | undefined,
  ): { readonly country: string | null; readonly region: string | null } {
    if (explicitCountry) {
      return { country: explicitCountry.toUpperCase(), region: null };
    }
    if (!ip) return { country: null, region: null };

    // Private IP detection
    if (
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      ip.startsWith('127.') ||
      ip.startsWith('172.16.')
    ) {
      return { country: 'XX', region: 'LOCAL' };
    }

    return { country: null, region: null };
  }

  private inferDeviceType(device: DeviceInfo): string {
    if (device.isBot) return 'bot';
    if (device.isMobile) return 'mobile';
    return 'desktop';
  }

  /**
   * Bot likelihood score 0-100.
   */
  private botScore(userAgent: string | undefined, ip: string | undefined): number {
    let score = 0;
    if (!userAgent) score += 30;
    if (userAgent && /bot|crawler|spider|scraper|headless/i.test(userAgent)) score += 60;
    if (!ip) score += 10;
    if (score > 100) score = 100;
    return score;
  }
}
