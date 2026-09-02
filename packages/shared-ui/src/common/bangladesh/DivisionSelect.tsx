import React from 'react';
import { Select, SelectProps, SelectOption } from '../components/Select';
import { DIVISIONS, DIVISION_DETAILS } from '@vubon/shared-constants';

export interface DivisionSelectProps extends Omit<SelectProps, 'options'> {
  includeAll?: boolean;
  allLabel?: string;
  showBangla?: boolean;
  value?: string;
}

export const DivisionSelect: React.FC<DivisionSelectProps> = ({
  includeAll = false,
  allLabel = 'All Divisions',
  showBangla = true,
  value,
  ...props
}) => {
  const options: SelectOption[] = [];

  if (includeAll) {
    options.push({
      value: 'all',
      label: allLabel,
    });
  }

  Object.entries(DIVISIONS).forEach(([key, val]) => {
    const details = DIVISION_DETAILS[val];
    options.push({
      value: val,
      label: showBangla ? `${details.nameBangla} (${details.name})` : details.name,
    });
  });

  // If value is 'all' or empty, don't pass it to the select
  const selectValue = value === 'all' || !value ? undefined : value;

  return (
    <Select 
      {...props} 
      options={options} 
      value={selectValue}
    />
  );
};
