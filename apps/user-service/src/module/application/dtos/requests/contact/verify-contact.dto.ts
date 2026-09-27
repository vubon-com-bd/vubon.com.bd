/**
 * VerifyContactRequestDTO
 */
export interface VerifyContactRequestDTO {
  readonly userId: string;
  readonly contactId: string;
  readonly verificationCode: string;
}
