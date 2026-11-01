export interface ReturnReasonActionRequestDTO {
  readonly reasonId: string;
}
export interface DeactivateReturnReasonRequestDTO {
  readonly reasonId: string;
  readonly reason?: string;
}
