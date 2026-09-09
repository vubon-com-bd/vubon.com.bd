export const ticketPriorityConfig = {
  levels: {
    low: { weight: 1, label: 'Low', color: '#10B981' },
    medium: { weight: 2, label: 'Medium', color: '#F59E0B' },
    high: { weight: 3, label: 'High', color: '#EF4444' },
    urgent: { weight: 4, label: 'Urgent', color: '#7C3AED' },
    critical: { weight: 5, label: 'Critical', color: '#DC2626' },
  },
  autoAssign: true,
  autoEscalate: true,
};
