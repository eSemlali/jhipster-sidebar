import { IVehicle } from '@/shared/model/vehicle.model';

export interface IClient {
  id?: number;
  name?: string;
  email?: string;
  mobile?: string;
  enabled?: boolean;
  created?: Date;
  lastUpdate?: Date;
  vehicles?: IVehicle[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public mobile?: string,
    public enabled?: boolean,
    public created?: Date,
    public lastUpdate?: Date,
    public vehicles?: IVehicle[]
  ) {
    this.enabled = this.enabled || false;
  }
}
