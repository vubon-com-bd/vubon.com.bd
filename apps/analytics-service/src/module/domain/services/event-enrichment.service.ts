/**
 * Event Enrichment Service
 * @module analytics-service/domain/services
 *
 * Event-এ additional dimensions/context add করে।
 * Business Rule:
 * - User-agent → device type classification
 * - Referrer → source classification
 * - Payload → derived fields (revenue = price × quantity)
 */
import { EventVO } from '../value-objects/composites/event.vo.js';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo.js';
import type { JsonValue } from '@vubon/shared-types/common';

export class EventEnrichmentService {
  enrich(event: EventVO): EventVO {
    const enrichedPayload = this.enrichPayload(event);

    // If payload didn't change, return original
    if (enrichedPayload === event.payload) {
      return event;
    }

    // Rebuild event with enriched payload
    return EventVO.create({
      id: event.id,
      name: event.name,
      source: event.source,
      timestamp: event.timestamp,
      payload: enrichedPayload,
      sessionId: event.sessionId,
      userId: event.userId,
    });
  }

  private enrichPayload(event: EventVO): EventPayloadVO {
    const raw: Record<string, JsonValue> = { ...event.payload.payload };
    let changed = false;

    // 1. Derive revenue from price × quantity
    if (
      event.name.value === 'purchase' &&
      raw['revenue'] === undefined &&
      typeof raw['price'] === 'number' &&
      typeof raw['quantity'] === 'number'
    ) {
      raw['revenue'] = (raw['price'] as number) * (raw['quantity'] as number);
      changed = true;
    }

    // 2. Derive AOV hint
    if (
      event.name.value === 'purchase' &&
      raw['revenue'] === undefined &&
      typeof raw['total'] === 'number'
    ) {
      raw['revenue'] = raw['total'];
      changed = true;
    }

    // 3. Add source-derived channel
    if (raw['channel'] === undefined) {
      raw['channel'] = event.source.value;
      changed = true;
    }

    // 4. Add event category
    if (raw['event_category'] === undefined) {
      if (event.name.isEcommerce()) raw['event_category'] = 'ecommerce';
      else if (event.name.isEngagement()) raw['event_category'] = 'engagement';
      else raw['event_category'] = 'other';
      changed = true;
    }

    // 5. Normalize boolean strings
    if (typeof raw['is_mobile'] === 'string') {
      raw['is_mobile'] = raw['is_mobile'] === 'true';
      changed = true;
    }

    if (!changed) return event.payload;
    return EventPayloadVO.create(raw);
  }

  /**
   * Enrich with geo context (used when IP lookup available)
   */
  enrichGeo(event: EventVO, geo: { country?: string; city?: string; region?: string }): EventVO {
    const raw: Record<string, JsonValue> = { ...event.payload.payload };
    if (geo.country) raw['country'] = geo.country;
    if (geo.city) raw['city'] = geo.city;
    if (geo.region) raw['region'] = geo.region;

    return EventVO.create({
      id: event.id,
      name: event.name,
      source: event.source,
      timestamp: event.timestamp,
      payload: EventPayloadVO.create(raw),
      sessionId: event.sessionId,
      userId: event.userId,
    });
  }

  /**
   * Enrich with device context
   */
  enrichDevice(
    event: EventVO,
    device: { type?: string; os?: string; browser?: string }
  ): EventVO {
    const raw: Record<string, JsonValue> = { ...event.payload.payload };
    if (device.type) raw['device_type'] = device.type;
    if (device.os) raw['device_os'] = device.os;
    if (device.browser) raw['device_browser'] = device.browser;

    return EventVO.create({
      id: event.id,
      name: event.name,
      source: event.source,
      timestamp: event.timestamp,
      payload: EventPayloadVO.create(raw),
      sessionId: event.sessionId,
      userId: event.userId,
    });
  }
}
