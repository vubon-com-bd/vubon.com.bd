/**
 * PaymentEventsHandler — cross-service consumer for payment events
 * @module logistics-service/infrastructure/handlers
 *
 * Listens on the BullMQ 'domain-events' queue for events emitted by
 * payment-service. Advances shipment lifecycle for prepaid (non-COD) flows.
 *
 *   payment.captured → shipment.confirm() for matching NON-COD shipments
 *   payment.failed   → shipment.putOnHold()
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '../../application/services/interfaces/shipment.service.interface.js';
import {
  SHIPMENT_REPOSITORY,
  type ShipmentRepository,
} from '../../domain/repositories/shipment.repository.interface.js';
import { OrderIdVO } from '../../domain/value-objects/primitives/order-id.vo.js';

interface PaymentCapturedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly amount: number;
  readonly currency: string;
}

interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly reason: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class PaymentEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentEventsHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    @Inject(SHIPMENT_REPOSITORY) private readonly shipmentRepo: ShipmentRepository,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('payment.captured', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as PaymentCapturedPayload;
      this.logger.log(
        `💳 payment.captured received → order=${payload.orderId} payment=${payload.paymentId}`,
      );
      try {
        const shipments = await this.shipmentRepo.findByOrderId(OrderIdVO.create(payload.orderId));
        if (shipments.length === 0) {
          this.logger.warn(`⚠️ No shipments found for order ${payload.orderId} — skipping`);
          return;
        }
        for (const shipment of shipments) {
          // Prepaid shipments (non-COD) confirm on payment capture
          if (!shipment.isCOD && shipment.isPending()) {
            await this.shipmentService.confirm(shipment.id, 'system:payment-events-handler');
            this.logger.log(
              `✅ Shipment ${shipment.id} (${shipment.trackingNumber.value}) CONFIRMED for prepaid order ${payload.orderId}`,
            );
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`❌ Shipment confirm failed for order ${payload.orderId}: ${msg}`);
      }
    });

    this.eventBus.registerHandler('payment.failed', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as PaymentFailedPayload;
      this.logger.log(
        `⚠️ payment.failed received → order=${payload.orderId} reason=${payload.reason}`,
      );
      try {
        const shipments = await this.shipmentRepo.findByOrderId(OrderIdVO.create(payload.orderId));
        for (const shipment of shipments) {
          if (shipment.isPending() || shipment.isConfirmed()) {
            await this.shipmentService.putOnHold(
              { shipmentId: shipment.id, reason: `Payment failed: ${payload.reason}` },
              'system:payment-events-handler',
            );
            this.logger.log(`✅ Shipment ${shipment.id} put ON_HOLD after payment failure`);
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`❌ Shipment hold failed for order ${payload.orderId}: ${msg}`);
      }
    });

    this.logger.log(
      `🔗 PaymentEventsHandler subscribed to payment.captured/failed on domain-events queue`,
    );
  }
}
