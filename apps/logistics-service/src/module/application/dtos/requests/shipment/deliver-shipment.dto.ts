/**
 * DeliverShipmentRequestDto — input for DeliverShipmentCommand
 * @module logistics-service/application/dtos/requests/shipment
 */
export interface DeliverShipmentRequestDto {
  readonly shipmentId: string;
  readonly receivedBy?: string;
  readonly proof?: {
    readonly type: 'signature' | 'otp' | 'photo' | 'id_verification' | 'contactless';
    readonly signatureUrl?: string;
    readonly photoUrl?: string;
    readonly otp?: string;
    readonly idNumber?: string;
    readonly recipientName?: string;
    readonly capturedAt?: string;
  };
}
