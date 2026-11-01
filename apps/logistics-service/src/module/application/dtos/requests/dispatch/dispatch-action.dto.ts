export interface DispatchActionRequestDTO {
  readonly dispatchId: string;
}
export interface DispatchWithManifestRequestDTO {
  readonly dispatchId: string;
  readonly manifestUrl?: string;
}
export interface FailDispatchRequestDTO {
  readonly dispatchId: string;
  readonly reason: string;
}
export interface CancelDispatchRequestDTO {
  readonly dispatchId: string;
  readonly reason?: string;
}
export interface ReturnDispatchRequestDTO {
  readonly dispatchId: string;
  readonly reason?: string;
}
