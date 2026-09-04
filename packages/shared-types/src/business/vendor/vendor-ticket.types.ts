/**
 * Vendor Ticket Types
 * ভেন্ডর টিকেট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Vendor } from './vendor.types';

export interface VendorTicket extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  ticketNumber: string;
  title: string;
  titleBangla?: string;
  description: string;
  descriptionBangla?: string;
  type: 'support' | 'complaint' | 'inquiry' | 'request' | 'issue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed' | 'escalated';
  category: string;
  subCategory?: string;
  assignedTo?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  resolution?: string;
  resolutionBangla?: string;
  attachments?: string[];
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorTicketCreateInput {
  vendorId: string;
  title: string;
  titleBangla?: string;
  description: string;
  descriptionBangla?: string;
  type: 'support' | 'complaint' | 'inquiry' | 'request' | 'issue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  subCategory?: string;
  attachments?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTicketUpdateInput {
  title?: string;
  titleBangla?: string;
  description?: string;
  descriptionBangla?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed' | 'escalated';
  assignedTo?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  resolution?: string;
  resolutionBangla?: string;
  attachments?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface VendorTicketResponse {
  vendorTicket: VendorTicket;
}
