/**
 * AdminTeamList Component
 * অ্যাডমিন টিম লিস্ট কম্পোনেন্ট
 */

import React from 'react';
import { AdminTeam } from '@vubon/shared-types';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';

export interface AdminTeamListProps {
  teams: AdminTeam[];
  onEdit?: (team: AdminTeam) => void;
  onDelete?: (teamId: string) => void;
  onViewMembers?: (teamId: string) => void;
  className?: string;
}

export const AdminTeamList: React.FC<AdminTeamListProps> = ({
  teams,
  onEdit,
  onDelete,
  onViewMembers,
  className = '',
}) => {
  if (teams.length === 0) {
    return <p className="text-gray-500">No teams found.</p>;
  }

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-600',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {teams.map((team) => (
        <Card key={team.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">{team.name}</h4>
              {team.description && (
                <p className="text-sm text-gray-600">{team.description}</p>
              )}
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Department: {team.department}</span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[team.status] || 'bg-gray-100 text-gray-600'}`}
                >
                  {team.status}
                </span>
                <span className="text-xs text-gray-500">
                  Members: {team.members.length}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {onViewMembers && (
                <Button variant="outline" size="sm" onClick={() => onViewMembers(team.id)}>
                  Members
                </Button>
              )}
              {onEdit && (
                <Button variant="outline" size="sm" onClick={() => onEdit(team)}>
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button variant="outline" size="sm" onClick={() => onDelete(team.id)}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
