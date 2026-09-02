import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface VerificationRequest {
  type: 'email' | 'phone' | 'document' | 'identity';
  value: string;
  metadata?: Record<string, unknown>;
}

export interface VerificationResponse {
  id: string;
  status: 'pending' | 'verified' | 'failed' | 'expired';
  type: string;
  value: string;
  verifiedAt?: string;
  expiresAt: string;
  attempts: number;
  metadata?: Record<string, unknown>;
}

export interface VerificationOptions {
  method: 'sms' | 'email' | 'call' | 'app';
  code?: string;
  token?: string;
  expireIn?: number;
}

export interface DocumentVerificationRequest {
  type: 'nid' | 'passport' | 'driving_license' | 'birth_certificate';
  frontImage: string;
  backImage?: string;
  selfie?: string;
  number: string;
  name: string;
  dateOfBirth: string;
}

export interface DocumentVerificationResponse {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | 'requires_review';
  type: string;
  submittedAt: string;
  reviewedAt?: string;
  decision?: string;
  decisionReason?: string;
  confidenceScore?: number;
}

export class VerificationEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async verifyEmail(email: string): Promise<VerificationResponse> {
    return this.client.post<VerificationResponse>('/verification/email', { email });
  }

  async verifyPhone(phone: string): Promise<VerificationResponse> {
    return this.client.post<VerificationResponse>('/verification/phone', { phone });
  }

  async verifyDocument(data: DocumentVerificationRequest): Promise<DocumentVerificationResponse> {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('frontImage', data.frontImage);
    if (data.backImage) formData.append('backImage', data.backImage);
    if (data.selfie) formData.append('selfie', data.selfie);
    formData.append('number', data.number);
    formData.append('name', data.name);
    formData.append('dateOfBirth', data.dateOfBirth);

    return this.client.post<DocumentVerificationResponse>('/verification/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async verifyIdentity(data: {
    method: 'nid' | 'passport' | 'driving_license';
    number: string;
    dateOfBirth: string;
    name: string;
  }): Promise<VerificationResponse> {
    return this.client.post<VerificationResponse>('/verification/identity', data);
  }

  async verifyOTP(verificationId: string, code: string): Promise<VerificationResponse> {
    return this.client.post<VerificationResponse>(`/verification/${verificationId}/verify`, {
      code,
    });
  }

  async resendVerification(verificationId: string): Promise<VerificationResponse> {
    return this.client.post<VerificationResponse>(`/verification/${verificationId}/resend`);
  }

  async getVerificationStatus(verificationId: string): Promise<VerificationResponse> {
    return this.client.get<VerificationResponse>(`/verification/${verificationId}`);
  }

  async getDocumentVerificationStatus(documentId: string): Promise<DocumentVerificationResponse> {
    return this.client.get<DocumentVerificationResponse>(`/verification/document/${documentId}`);
  }

  async getVerificationHistory(): Promise<VerificationResponse[]> {
    return this.client.get<VerificationResponse[]>('/verification/history');
  }

  async cancelVerification(verificationId: string): Promise<{ success: boolean }> {
    return this.client.delete(`/verification/${verificationId}`);
  }
}
