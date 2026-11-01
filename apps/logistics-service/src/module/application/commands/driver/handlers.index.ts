import { CreateDriverHandler } from './create-driver.handler.js';
import { UpdateDriverHandler } from './update.handler.js';
import { MarkAvailableDriverHandler } from './mark-available.handler.js';
import { GoOnDutyDriverHandler } from './go-on-duty.handler.js';
import { GoOnBreakDriverHandler } from './go-on-break.handler.js';
import { GoOffDutyDriverHandler } from './go-off-duty.handler.js';
import { GoOnLeaveDriverHandler } from './go-on-leave.handler.js';
import { SuspendDriverHandler } from './suspend.handler.js';
import { DeactivateDriverHandler } from './deactivate.handler.js';
import { AssignVehicleDriverHandler } from './assign-vehicle.handler.js';
import { UnassignVehicleDriverHandler } from './unassign-vehicle.handler.js';
import { CollectCashDriverHandler } from './collect-cash.handler.js';
import { DepositCashDriverHandler } from './deposit-cash.handler.js';
import { RecordDeliveryDriverHandler } from './record-delivery.handler.js';

export const DRIVER_COMMAND_HANDLERS = [
  CreateDriverHandler,
  UpdateDriverHandler,
  MarkAvailableDriverHandler,
  GoOnDutyDriverHandler,
  GoOnBreakDriverHandler,
  GoOffDutyDriverHandler,
  GoOnLeaveDriverHandler,
  SuspendDriverHandler,
  DeactivateDriverHandler,
  AssignVehicleDriverHandler,
  UnassignVehicleDriverHandler,
  CollectCashDriverHandler,
  DepositCashDriverHandler,
  RecordDeliveryDriverHandler,
] as const;
