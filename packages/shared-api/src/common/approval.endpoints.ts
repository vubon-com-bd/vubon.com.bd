import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface ApprovalRequest {
  id: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  data: Record<string, unknown>;
  metadata: {
    requestedBy: string;
    requestedAt: string;
    reviewedBy?: string;
    reviewedAt?: string;
    comments?: string;
  };
  workflow: {
    steps: ApprovalStep[];
    currentStep: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalStep {
  id: string;
  name: string;
  type: 'single' | 'multiple' | 'any';
  approvers: string[];
  status: 'pending' | 'approved' | 'rejected' | 'skipped';
  comments?: string;
  completedAt?: string;
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  type: string;
  steps: {
    name: string;
    type: 'single' | 'multiple' | 'any';
    approvers: string[];
    condition?: string;
  }[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalOptions {
  type: string;
  data: Record<string, unknown>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  comments?: string;
  expiresIn?: number;
}

export class ApprovalEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async submitApproval(options: ApprovalOptions): Promise<ApprovalRequest> {
    return this.client.post<ApprovalRequest>('/approvals', options);
  }

  async approveApproval(id: string, comments?: string): Promise<ApprovalRequest> {
    return this.client.post<ApprovalRequest>(`/approvals/${id}/approve`, { comments });
  }

  async rejectApproval(id: string, comments: string): Promise<ApprovalRequest> {
    return this.client.post<ApprovalRequest>(`/approvals/${id}/reject`, { comments });
  }

  async cancelApproval(id: string, comments?: string): Promise<ApprovalRequest> {
    return this.client.post<ApprovalRequest>(`/approvals/${id}/cancel`, { comments });
  }

  async getApproval(id: string): Promise<ApprovalRequest> {
    return this.client.get<ApprovalRequest>(`/approvals/${id}`);
  }

  async listApprovals(options: {
    status?: string[];
    type?: string[];
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{
    items: ApprovalRequest[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (options.status) params.status = options.status.join(',');
    if (options.type) params.type = options.type.join(',');
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);
    if (options.sortBy) params.sortBy = options.sortBy;
    if (options.sortOrder) params.sortOrder = options.sortOrder;

    return this.client.get('/approvals', { params });
  }

  async getPendingApprovals(): Promise<ApprovalRequest[]> {
    return this.client.get<ApprovalRequest[]>('/approvals/pending');
  }

  async getMyApprovals(status?: 'pending' | 'approved' | 'rejected'): Promise<ApprovalRequest[]> {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    return this.client.get<ApprovalRequest[]>('/approvals/my', { params });
  }

  async getApprovalHistory(): Promise<ApprovalRequest[]> {
    return this.client.get<ApprovalRequest[]>('/approvals/history');
  }

  async createApprovalWorkflow(
    workflow: Omit<ApprovalWorkflow, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApprovalWorkflow> {
    return this.client.post<ApprovalWorkflow>('/approvals/workflows', workflow);
  }

  async getApprovalWorkflow(id: string): Promise<ApprovalWorkflow> {
    return this.client.get<ApprovalWorkflow>(`/approvals/workflows/${id}`);
  }

  async listApprovalWorkflows(type?: string): Promise<ApprovalWorkflow[]> {
    const params: Record<string, string> = {};
    if (type) params.type = type;
    return this.client.get<ApprovalWorkflow[]>('/approvals/workflows', { params });
  }

  async updateApprovalWorkflow(
    id: string,
    workflow: Partial<ApprovalWorkflow>
  ): Promise<ApprovalWorkflow> {
    return this.client.patch<ApprovalWorkflow>(`/approvals/workflows/${id}`, workflow);
  }

  async deleteApprovalWorkflow(id: string): Promise<{ success: boolean }> {
    return this.client.delete(`/approvals/workflows/${id}`);
  }

  async getApprovalStats(): Promise<{
    pending: number;
    approved: number;
    rejected: number;
    cancelled: number;
    averageTime: number;
  }> {
    return this.client.get('/approvals/stats');
  }
}
