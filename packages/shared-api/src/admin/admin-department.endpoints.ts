/**
 * Admin Department Endpoints
 * অ্যাডমিন ডিপার্টমেন্ট এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminDepartment,
  AdminDepartmentCreateInput,
  AdminDepartmentUpdateInput,
} from '@vubon/shared-types';
import { ADMIN_DEPARTMENT } from '@vubon/shared-constants';

export class AdminDepartmentEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get departments
   * ডিপার্টমেন্ট পাওয়া
   */
  async getDepartments(params?: { page?: number; limit?: number; status?: string }): Promise<{
    departments: AdminDepartment[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.status) queryParams.status = params.status;

    return this.client.get('/admin/departments', { params: queryParams });
  }

  /**
   * Get department by ID
   * আইডি দ্বারা ডিপার্টমেন্ট পাওয়া
   */
  async getDepartment(departmentId: string): Promise<AdminDepartment> {
    return this.client.get<AdminDepartment>(`/admin/departments/${departmentId}`);
  }

  /**
   * Create department
   * ডিপার্টমেন্ট তৈরি করা
   */
  async createDepartment(data: AdminDepartmentCreateInput): Promise<AdminDepartment> {
    return this.client.post<AdminDepartment>('/admin/departments', data);
  }

  /**
   * Update department
   * ডিপার্টমেন্ট আপডেট করা
   */
  async updateDepartment(
    departmentId: string,
    data: AdminDepartmentUpdateInput
  ): Promise<AdminDepartment> {
    return this.client.patch<AdminDepartment>(`/admin/departments/${departmentId}`, data);
  }

  /**
   * Delete department
   * ডিপার্টমেন্ট ডিলিট করা
   */
  async deleteDepartment(departmentId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/departments/${departmentId}`);
  }

  /**
   * Get department members
   * ডিপার্টমেন্টের সদস্য পাওয়া
   */
  async getDepartmentMembers(departmentId: string): Promise<string[]> {
    return this.client.get<string[]>(`/admin/departments/${departmentId}/members`);
  }

  /**
   * Add member to department
   * ডিপার্টমেন্টে সদস্য যোগ করা
   */
  async addDepartmentMember(departmentId: string, adminId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(
      `/admin/departments/${departmentId}/members/${adminId}`
    );
  }

  /**
   * Remove member from department
   * ডিপার্টমেন্ট থেকে সদস্য রিমুভ করা
   */
  async removeDepartmentMember(
    departmentId: string,
    adminId: string
  ): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/admin/departments/${departmentId}/members/${adminId}`
    );
  }

  /**
   * Get admin departments
   * অ্যাডমিনের ডিপার্টমেন্ট পাওয়া
   */
  async getAdminDepartments(adminId: string): Promise<AdminDepartment[]> {
    return this.client.get<AdminDepartment[]>(`/admin/${adminId}/departments`);
  }

  /**
   * Set department head
   * ডিপার্টমেন্ট হেড সেট করা
   */
  async setDepartmentHead(departmentId: string, adminId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(
      `/admin/departments/${departmentId}/head/${adminId}`
    );
  }

  /**
   * Get available departments from constants
   * কনস্ট্যান্ট থেকে উপলব্ধ ডিপার্টমেন্ট পাওয়া
   */
  getAvailableDepartments(): Record<string, string> {
    return {
      IT: ADMIN_DEPARTMENT.DEPARTMENTS.IT,
      HR: ADMIN_DEPARTMENT.DEPARTMENTS.HR,
      FINANCE: ADMIN_DEPARTMENT.DEPARTMENTS.FINANCE,
      MARKETING: ADMIN_DEPARTMENT.DEPARTMENTS.MARKETING,
      SALES: ADMIN_DEPARTMENT.DEPARTMENTS.SALES,
      SUPPORT: ADMIN_DEPARTMENT.DEPARTMENTS.SUPPORT,
      OPERATIONS: ADMIN_DEPARTMENT.DEPARTMENTS.OPERATIONS,
      LEGAL: ADMIN_DEPARTMENT.DEPARTMENTS.LEGAL,
      COMPLIANCE: ADMIN_DEPARTMENT.DEPARTMENTS.COMPLIANCE,
      ADMIN: ADMIN_DEPARTMENT.DEPARTMENTS.ADMIN,
      CONTENT: ADMIN_DEPARTMENT.DEPARTMENTS.CONTENT,
      PRODUCT: ADMIN_DEPARTMENT.DEPARTMENTS.PRODUCT,
      ENGINEERING: ADMIN_DEPARTMENT.DEPARTMENTS.ENGINEERING,
      DESIGN: ADMIN_DEPARTMENT.DEPARTMENTS.DESIGN,
    };
  }

  /**
   * Get department metadata from constants
   * কনস্ট্যান্ট থেকে ডিপার্টমেন্ট মেটাডেটা পাওয়া
   */
  getDepartmentMetadata(department: string): {
    name: string;
    nameBangla: string;
    code: string;
    description: string;
  } | null {
    const metadata = ADMIN_DEPARTMENT.METADATA;
    const deptKey = Object.keys(metadata).find(
      (key) => metadata[key as keyof typeof metadata].code === department
    );
    if (!deptKey) return null;
    return metadata[deptKey as keyof typeof metadata];
  }

  /**
   * Get department statuses from constants
   * কনস্ট্যান্ট থেকে ডিপার্টমেন্ট স্ট্যাটাস পাওয়া
   */
  getDepartmentStatuses(): string[] {
    return ['active', 'inactive'];
  }
}
