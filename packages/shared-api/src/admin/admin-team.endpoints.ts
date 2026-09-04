/**
 * Admin Team Endpoints
 * অ্যাডমিন টিম এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminTeam, AdminTeamCreateInput, AdminTeamUpdateInput } from '@vubon/shared-types';

export class AdminTeamEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get teams
   * টিম পাওয়া
   */
  async getTeams(params?: {
    page?: number;
    limit?: number;
    department?: string;
    status?: string;
  }): Promise<{
    teams: AdminTeam[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.department) queryParams.department = params.department;
    if (params?.status) queryParams.status = params.status;

    return this.client.get('/admin/teams', { params: queryParams });
  }

  /**
   * Get team by ID
   * আইডি দ্বারা টিম পাওয়া
   */
  async getTeam(teamId: string): Promise<AdminTeam> {
    return this.client.get<AdminTeam>(`/admin/teams/${teamId}`);
  }

  /**
   * Create team
   * টিম তৈরি করা
   */
  async createTeam(data: AdminTeamCreateInput): Promise<AdminTeam> {
    return this.client.post<AdminTeam>('/admin/teams', data);
  }

  /**
   * Update team
   * টিম আপডেট করা
   */
  async updateTeam(teamId: string, data: AdminTeamUpdateInput): Promise<AdminTeam> {
    return this.client.patch<AdminTeam>(`/admin/teams/${teamId}`, data);
  }

  /**
   * Delete team
   * টিম ডিলিট করা
   */
  async deleteTeam(teamId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/teams/${teamId}`);
  }

  /**
   * Add member to team
   * টিমে সদস্য যোগ করা
   */
  async addTeamMember(teamId: string, adminId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/teams/${teamId}/members/${adminId}`);
  }

  /**
   * Remove member from team
   * টিম থেকে সদস্য রিমুভ করা
   */
  async removeTeamMember(teamId: string, adminId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/teams/${teamId}/members/${adminId}`);
  }

  /**
   * Get team members
   * টিমের সদস্য পাওয়া
   */
  async getTeamMembers(teamId: string): Promise<string[]> {
    return this.client.get<string[]>(`/admin/teams/${teamId}/members`);
  }

  /**
   * Get admin teams
   * অ্যাডমিনের টিম পাওয়া
   */
  async getAdminTeams(adminId: string): Promise<AdminTeam[]> {
    return this.client.get<AdminTeam[]>(`/admin/${adminId}/teams`);
  }
}
