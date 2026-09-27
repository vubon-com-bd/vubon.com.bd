/**
 * UserKycServiceInterface
 */
import type { SubmitKycRequestDTO } from '../../dtos/requests/kyc/index.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import type { ListKycDocumentsResult } from '../../queries/kyc/list-kyc-documents.handler.js';

export interface UserKycServiceInterface {
  getStatus(userId: string): Promise<KycResponseDTO>;
  listDocuments(userId: string): Promise<ListKycDocumentsResult>;
  submit(input: SubmitKycRequestDTO): Promise<KycResponseDTO>;
  verify(kycId: string, verifiedBy: string): Promise<KycResponseDTO>;
  reject(kycId: string, reason: string, rejectedBy: string): Promise<KycResponseDTO>;
  reverify(kycId: string, userId: string): Promise<KycResponseDTO>;
}
