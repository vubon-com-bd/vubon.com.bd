/**
 * SetDefaultMethodRequestDTO
 * @module payment-service/application/dtos/requests/method
 */
export interface SetDefaultMethodRequestDTO {
  readonly methodId: string;
}

export interface SetDefaultMethodContextDTO {
  readonly request: SetDefaultMethodRequestDTO;
  readonly userId: string;
}
