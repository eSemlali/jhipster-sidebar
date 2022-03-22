export interface IVehicleBrand {
  id?: number;
  name?: string;
  enabled?: boolean;
}

export class VehicleBrand implements IVehicleBrand {
  constructor(public id?: number, public name?: string, public enabled?: boolean) {
    this.enabled = this.enabled || false;
  }
}
