export interface VehicleData {
  capacity: number;
}

export const calculateVehicleCapacity = (vehicle: VehicleData): number => {
  return vehicle.capacity;
};

export const calculateVehicleUtilization = (vehicle: VehicleData, load: number): number => {
  if (vehicle.capacity === 0) return 0;
  return (load / vehicle.capacity) * 100;
};

export const isVehicleOverloaded = (vehicle: VehicleData, load: number): boolean => {
  return load > vehicle.capacity;
};

export const calculateVehicleEfficiency = (distance: number, fuelUsed: number): number => {
  if (fuelUsed === 0) return 0;
  return distance / fuelUsed;
};
