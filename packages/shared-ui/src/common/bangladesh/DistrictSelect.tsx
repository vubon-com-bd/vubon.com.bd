import React, { useMemo } from 'react';
import { Select, SelectProps } from '../components/Select';
import { DIVISIONS, DIVISION_DETAILS } from '@vubon/shared-constants';

export interface DistrictSelectProps extends Omit<SelectProps, 'options'> {
  division?: string;
  includeAll?: boolean;
  allLabel?: string;
  showBangla?: boolean;
}

export const DistrictSelect: React.FC<DistrictSelectProps> = ({
  division,
  includeAll = false,
  allLabel = 'All Districts',
  showBangla = true,
  ...props
}) => {
  const options = useMemo(() => {
    if (!division) {
      return [];
    }

    const divisionKey = Object.keys(DIVISIONS).find(
      key => DIVISIONS[key as keyof typeof DIVISIONS] === division
    );

    if (!divisionKey) {
      return [];
    }

    const details = DIVISION_DETAILS[division as keyof typeof DIVISION_DETAILS];
    
    if (!details) {
      return [];
    }

    return details.districts.map((district) => ({
      value: district.toLowerCase().replace(/\s+/g, '-'),
      label: showBangla ? district : district,
    }));
  }, [division, showBangla]);

  if (includeAll && options.length > 0) {
    options.unshift({
      value: '',
      label: allLabel,
    });
  }

  return <Select {...props} options={options} disabled={!division} />;
};
