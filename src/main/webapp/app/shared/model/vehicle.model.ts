import { IVehicleType } from '@/shared/model/vehicle-type.model';
import { IVehicleColor } from '@/shared/model/vehicle-color.model';
import { IVehicleBrand } from '@/shared/model/vehicle-brand.model';
import { IClient } from '@/shared/model/client.model';

export interface IVehicle {
  id?: number;
  plate?: string;
  created?: Date;
  lastUpdate?: Date;
  vehicleType?: IVehicleType;
  vehicleColor?: IVehicleColor;
  vehicleBrand?: IVehicleBrand;
  client?: IClient;
}

export class Vehicle implements IVehicle {
  constructor(
    public id?: number,
    public plate?: string,
    public created?: Date,
    public lastUpdate?: Date,
    public vehicleType?: IVehicleType,
    public vehicleColor?: IVehicleColor,
    public vehicleBrand?: IVehicleBrand,
    public client?: IClient
  ) {}
}
