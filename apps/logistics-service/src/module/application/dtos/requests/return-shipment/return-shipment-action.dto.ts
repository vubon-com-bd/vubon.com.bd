export interface ReturnShipmentActionRequestDTO {
  readonly returnId: string;
}
export interface ApproveReturnRequestDTO {
  readonly returnId: string;
  readonly approvedBy: string;
}
export interface RejectReturnRequestDTO {
  readonly returnId: string;
  readonly reason: string;
}
export interface SchedulePickupRequestDTO {
  readonly returnId: string;
}
export interface MarkReceivedRequestDTO {
  readonly returnId: string;
  readonly receivedBy?: string;
}
export interface InspectReturnRequestDTO {
  readonly returnId: string;
  readonly restockable: boolean;
  readonly inspectedBy?: string;
}
export interface CompleteReturnRequestDTO {
  readonly returnId: string;
  readonly refundAmount: number;
  readonly restockFeeAmount?: number;
}
export interface CancelReturnRequestDTO {
  readonly returnId: string;
  readonly reason?: string;
}
