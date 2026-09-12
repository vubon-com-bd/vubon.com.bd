export interface DriverData {
  isAvailable: boolean;
  isActive: boolean;
  isOnDuty: boolean;
  shiftStart: string;
  shiftEnd: string;
  maxShiftHours: number;
}

export const scheduleDriver = <T extends DriverData>(
  driver: T,
  shiftStart: string,
  shiftEnd: string
): T => {
  return {
    ...driver,
    shiftStart,
    shiftEnd,
    isOnDuty: true,
  };
};

export const isDriverAvailable = (driver: DriverData): boolean => {
  return driver.isAvailable && driver.isActive && !driver.isOnDuty;
};

export const calculateDriverShiftHours = (driver: DriverData): number => {
  const start = new Date(`1970-01-01T${driver.shiftStart}:00`);
  const end = new Date(`1970-01-01T${driver.shiftEnd}:00`);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
};

export const isDriverOverworked = (driver: DriverData): boolean => {
  const shiftHours = calculateDriverShiftHours(driver);
  return shiftHours > driver.maxShiftHours;
};
